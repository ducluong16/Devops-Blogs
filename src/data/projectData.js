export const projects = [
  {
    id: 'cicd-pipeline-automation',
    title: "CI/CD Pipeline Automation",
    description: "Build và deploy automation với Jenkins, GitLab CI, và ArgoCD",
    tech: ["Jenkins", "GitLab CI", "Docker", "Kubernetes", "ArgoCD"],
    icon: "Workflow",
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-blue-500 to-cyan-500",
    fullDescription: `
# CI/CD Pipeline Automation

## Project Overview

Dự án này tập trung vào việc xây dựng một hệ thống CI/CD pipeline hoàn chỉnh, tự động hóa toàn bộ quá trình từ code commit đến production deployment. Pipeline được thiết kế để handle multiple microservices với high availability và zero-downtime deployment.

## Architecture

### Pipeline Flow

\`\`\`
Developer → Git Push → Webhook → Jenkins/GitLab CI
                                        ↓
                                   Build Stage
                                   - Code checkout
                                   - Dependency installation
                                   - Unit tests
                                   - Static code analysis
                                        ↓
                                   Docker Build
                                   - Multi-stage build
                                   - Security scanning
                                   - Push to registry
                                        ↓
                                   Update Manifests
                                   - Update image tags
                                   - Push to GitOps repo
                                        ↓
                                   ArgoCD Sync
                                   - Auto sync to K8s
                                   - Health checks
                                   - Rollback on failure
\`\`\`

## Technologies Used

### Jenkins Pipeline
- **Declarative Pipeline**: Easy to read and maintain
- **Shared Libraries**: Reusable pipeline code
- **Parallel Execution**: Speed up build process
- **Blue Ocean UI**: Modern visualization

### GitLab CI
- **YAML Configuration**: Infrastructure as code
- **Auto DevOps**: Built-in templates
- **Container Registry**: Integrated Docker registry
- **Review Apps**: Temporary environments for MRs

### Docker
- **Multi-stage Builds**: Optimize image size
- **BuildKit**: Faster builds with caching
- **Distroless Images**: Minimal attack surface
- **Scanning**: Trivy for vulnerability detection

### Kubernetes
- **Namespaces**: Environment isolation
- **RBAC**: Fine-grained access control
- **Network Policies**: Traffic restriction
- **HPA**: Auto-scaling based on metrics

### ArgoCD
- **GitOps**: Single source of truth
- **App of Apps**: Hierarchical app management
- **Sync Waves**: Ordered deployment
- **Rollback**: Easy revert to previous versions

## Implementation Details

### Jenkinsfile

\`\`\`groovy
@Library('shared-pipeline-library') _

pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: docker
                    image: docker:latest
                    command: ['cat']
                    tty: true
                    volumeMounts:
                    - name: docker-sock
                      mountPath: /var/run/docker.sock
                  volumes:
                  - name: docker-sock
                    hostPath:
                      path: /var/run/docker.sock
            '''
        }
    }
    
    environment {
        DOCKER_REGISTRY = 'registry.example.com'
        IMAGE_NAME = 'myapp'
        GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm test'
                    }
                }
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Security Scan') {
                    steps {
                        sh 'npm audit'
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                container('docker') {
                    sh """
                        docker build \\
                            --build-arg BUILD_DATE=\$(date -u +'%Y-%m-%dT%H:%M:%SZ') \\
                            --build-arg VCS_REF=\${GIT_COMMIT_SHORT} \\
                            -t \${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${GIT_COMMIT_SHORT} \\
                            -t \${DOCKER_REGISTRY}/\${IMAGE_NAME}:latest \\
                            .
                    """
                }
            }
        }
        
        stage('Scan Image') {
            steps {
                container('docker') {
                    sh """
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                            aquasec/trivy image \\
                            --severity HIGH,CRITICAL \\
                            \${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${GIT_COMMIT_SHORT}
                    """
                }
            }
        }
        
        stage('Push Image') {
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'docker-registry', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh """
                            echo \$PASS | docker login -u \$USER --password-stdin \${DOCKER_REGISTRY}
                            docker push \${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${GIT_COMMIT_SHORT}
                            docker push \${DOCKER_REGISTRY}/\${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }
        
        stage('Update Manifests') {
            steps {
                script {
                    updateGitOpsRepo(
                        repo: 'gitops-repo',
                        branch: 'main',
                        path: 'apps/production/myapp/deployment.yaml',
                        image: "\${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${GIT_COMMIT_SHORT}"
                    )
                }
            }
        }
    }
    
    post {
        success {
            slackSend(
                color: 'good',
                message: "Pipeline succeeded: \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "Pipeline failed: \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
            )
        }
    }
}
\`\`\`

### GitLab CI Configuration

\`\`\`yaml
variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  IMAGE_TAG: \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHORT_SHA

stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm run test
    - npm run lint
  coverage: '/Statements\\s+:\\s+(\\d+\\.\\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u \$CI_REGISTRY_USER -p \$CI_REGISTRY_PASSWORD \$CI_REGISTRY
  script:
    - docker build -t \$IMAGE_TAG -t \$CI_REGISTRY_IMAGE:latest .
    - docker push \$IMAGE_TAG
    - docker push \$CI_REGISTRY_IMAGE:latest
  only:
    - main
    - develop

deploy:staging:
  stage: deploy
  image: alpine/k8s:latest
  script:
    - kubectl config use-context staging
    - kubectl set image deployment/myapp myapp=\$IMAGE_TAG -n staging
    - kubectl rollout status deployment/myapp -n staging
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

deploy:production:
  stage: deploy
  image: alpine/git:latest
  script:
    - git clone https://oauth2:\${GITLAB_TOKEN}@gitlab.com/company/gitops-repo.git
    - cd gitops-repo
    - sed -i "s|image:.*|image: \$IMAGE_TAG|g" apps/production/myapp/deployment.yaml
    - git config user.email "ci@example.com"
    - git config user.name "GitLab CI"
    - git add apps/production/myapp/deployment.yaml
    - git commit -m "Update image to \$IMAGE_TAG"
    - git push origin main
  environment:
    name: production
    url: https://app.example.com
  only:
    - main
  when: manual
\`\`\`

## Key Features

### 1. Automated Testing
- Unit tests run on every commit
- Integration tests in staging environment
- Performance tests before production
- Security scanning (SAST, DAST, dependency check)

### 2. Zero-Downtime Deployment
- Rolling updates with health checks
- Canary deployments for gradual rollout
- Blue-green deployment option
- Automatic rollback on failure

### 3. Multi-Environment Support
- Development: Auto-deploy on feature branch push
- Staging: Auto-deploy on develop branch
- Production: Manual approval required
- Environment-specific configurations

### 4. Monitoring & Alerting
- Build metrics tracked in Prometheus
- Deployment events sent to Slack
- Failed builds trigger PagerDuty alerts
- Performance metrics visualized in Grafana

## Metrics & Results

### Performance Improvements
- **Build Time**: Reduced from 15 minutes to 5 minutes (66% faster)
- **Deployment Frequency**: From weekly to multiple times per day
- **Lead Time**: From 2 days to 2 hours
- **MTTR**: From 4 hours to 30 minutes

### Quality Metrics
- **Test Coverage**: Increased to 85%
- **Failed Deployments**: Reduced by 70%
- **Security Vulnerabilities**: 90% faster detection and patching
- **Uptime**: 99.95% availability

## Challenges & Solutions

### Challenge 1: Long Build Times
**Solution**: Implemented multi-stage Docker builds with layer caching, parallel test execution, and Jenkins agents on Kubernetes for better resource utilization.

### Challenge 2: Configuration Drift
**Solution**: Adopted GitOps with ArgoCD ensuring cluster state matches Git repository, automatic drift detection and remediation.

### Challenge 3: Secret Management
**Solution**: Integrated with HashiCorp Vault for dynamic secrets, implemented Sealed Secrets for GitOps workflow.

## Future Improvements

- Implement progressive delivery with Flagger
- Add chaos engineering tests with Chaos Mesh
- Integrate DORA metrics tracking
- Implement feature flags with LaunchDarkly
- Add automated rollback based on error rates

## Resources

- Jenkins Pipeline Documentation
- GitLab CI/CD Best Practices
- ArgoCD User Guide
- Kubernetes Deployment Strategies
    `,
    challenges: [
      "Long build times affecting developer productivity",
      "Configuration drift between environments",
      "Manual deployment processes prone to errors",
      "Lack of visibility into deployment status"
    ],
    solutions: [
      "Multi-stage Docker builds with caching",
      "GitOps methodology with ArgoCD",
      "Automated testing and deployment",
      "Real-time monitoring and notifications"
    ]
  },
  {
    id: 'kubernetes-infrastructure',
    title: "Kubernetes Infrastructure",
    description: "Production-ready K8s cluster với high availability và auto-scaling",
    tech: ["Kubernetes", "AWS EKS", "Helm", "Prometheus", "Grafana"],
    icon: "Server",
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-green-500 to-emerald-500",
    fullDescription: `
# Kubernetes Infrastructure on AWS EKS

## Project Overview

Thiết kế và triển khai một Kubernetes infrastructure production-ready trên AWS EKS với các tính năng: high availability, auto-scaling, monitoring, logging, và security best practices. Infrastructure này phục vụ cho hơn 50 microservices với traffic peak 10,000 requests/second.

## Architecture Design

### Cluster Architecture

\`\`\`
                                   ┌─────────────────┐
                                   │  Route 53 DNS   │
                                   └────────┬────────┘
                                            │
                                   ┌────────▼────────┐
                                   │   AWS ALB/NLB   │
                                   └────────┬────────┘
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
            ┌───────▼────────┐     ┌───────▼────────┐     ┌───────▼────────┐
            │   AZ-1a         │     │   AZ-1b         │     │   AZ-1c         │
            │                 │     │                 │     │                 │
            │  ┌──────────┐  │     │  ┌──────────┐  │     │  ┌──────────┐  │
            │  │  Ingress │  │     │  │  Ingress │  │     │  │  Ingress │  │
            │  │Controller│  │     │  │Controller│  │     │  │Controller│  │
            │  └─────┬────┘  │     │  └─────┬────┘  │     │  └─────┬────┘  │
            │        │        │     │        │        │     │        │        │
            │  ┌─────▼────┐  │     │  ┌─────▼────┐  │     │  ┌─────▼────┐  │
            │  │ Services │  │     │  │ Services │  │     │  │ Services │  │
            │  └─────┬────┘  │     │  └─────┬────┘  │     │  └─────┬────┘  │
            │        │        │     │        │        │     │        │        │
            │  ┌─────▼────┐  │     │  ┌─────▼────┐  │     │  ┌─────▼────┐  │
            │  │   Pods   │  │     │  │   Pods   │  │     │  │   Pods   │  │
            │  └──────────┘  │     │  └──────────┘  │     │  └──────────┘  │
            │                 │     │                 │     │                 │
            │  ┌──────────┐  │     │  ┌──────────┐  │     │  ┌──────────┐  │
            │  │ EBS CSI  │  │     │  │ EBS CSI  │  │     │  │ EBS CSI  │  │
            │  └──────────┘  │     │  └──────────┘  │     │  └──────────┘  │
            └─────────────────┘     └─────────────────┘     └─────────────────┘
\`\`\`

## Infrastructure Components

### 1. EKS Cluster Configuration

**Terraform Configuration:**

\`\`\`hcl
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = "production-cluster"
  cluster_version = "1.28"

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent = true
    }
    aws-ebs-csi-driver = {
      most_recent = true
    }
  }

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    general = {
      min_size     = 3
      max_size     = 10
      desired_size = 5

      instance_types = ["t3.large"]
      capacity_type  = "ON_DEMAND"

      labels = {
        role = "general"
      }

      tags = {
        NodeGroup = "general"
      }
    }

    spot = {
      min_size     = 2
      max_size     = 20
      desired_size = 5

      instance_types = ["t3.large", "t3a.large"]
      capacity_type  = "SPOT"

      labels = {
        role = "spot"
      }

      taints = [{
        key    = "spot"
        value  = "true"
        effect = "NoSchedule"
      }]
    }
  }

  cluster_security_group_additional_rules = {
    ingress_nodes_ephemeral_ports_tcp = {
      description = "Nodes on ephemeral ports"
      protocol    = "tcp"
      from_port   = 1025
      to_port     = 65535
      type        = "ingress"
      source_node_security_group = true
    }
  }
}
\`\`\`

### 2. Networking Setup

**VPC Configuration:**

\`\`\`hcl
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "eks-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["ap-southeast-1a", "ap-southeast-1b", "ap-southeast-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = false
  single_nat_gateway = false
  one_nat_gateway_per_az = true

  enable_dns_hostnames = true
  enable_dns_support   = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = 1
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = 1
  }

  tags = {
    Environment = "production"
    Terraform   = "true"
  }
}
\`\`\`

## Auto-Scaling Configuration

### Cluster Autoscaler

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      labels:
        app: cluster-autoscaler
    spec:
      serviceAccountName: cluster-autoscaler
      containers:
      - image: registry.k8s.io/autoscaling/cluster-autoscaler:v1.28.0
        name: cluster-autoscaler
        resources:
          limits:
            cpu: 100m
            memory: 600Mi
          requests:
            cpu: 100m
            memory: 600Mi
        command:
          - ./cluster-autoscaler
          - --v=4
          - --stderrthreshold=info
          - --cloud-provider=aws
          - --skip-nodes-with-local-storage=false
          - --expander=least-waste
          - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/production-cluster
          - --balance-similar-node-groups
          - --skip-nodes-with-system-pods=false
        env:
          - name: AWS_REGION
            value: ap-southeast-1
\`\`\`

### Horizontal Pod Autoscaler

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
      - type: Pods
        value: 4
        periodSeconds: 15
      selectPolicy: Max
\`\`\`

## Monitoring Stack

### Prometheus Setup

\`\`\`bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack \\
  --namespace monitoring \\
  --create-namespace \\
  --set prometheus.prometheusSpec.retention=30d \\
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.storageClassName=gp3 \\
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=100Gi \\
  --set grafana.adminPassword=\$ADMIN_PASSWORD \\
  --set grafana.ingress.enabled=true \\
  --set grafana.ingress.hosts[0]=grafana.example.com
\`\`\`

### Custom Prometheus Rules

\`\`\`yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: application-alerts
  namespace: monitoring
spec:
  groups:
  - name: application
    interval: 30s
    rules:
    - alert: HighErrorRate
      expr: |
        sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)
        /
        sum(rate(http_requests_total[5m])) by (service)
        > 0.05
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "High error rate detected"
        description: "Service {{ \$labels.service }} has error rate above 5% (current value: {{ \$value }})"
    
    - alert: HighLatency
      expr: |
        histogram_quantile(0.95,
          sum(rate(http_request_duration_seconds_bucket[5m])) by (service, le)
        ) > 1
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "High latency detected"
        description: "Service {{ \$labels.service }} has p95 latency above 1s"
\`\`\`

## Logging Infrastructure

### EFK Stack (Elasticsearch, Fluentd, Kibana)

**Fluentd DaemonSet:**

\`\`\`yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
  namespace: logging
spec:
  selector:
    matchLabels:
      app: fluentd
  template:
    metadata:
      labels:
        app: fluentd
    spec:
      serviceAccountName: fluentd
      containers:
      - name: fluentd
        image: fluent/fluentd-kubernetes-daemonset:v1-debian-elasticsearch
        env:
        - name: FLUENT_ELASTICSEARCH_HOST
          value: "elasticsearch.logging.svc.cluster.local"
        - name: FLUENT_ELASTICSEARCH_PORT
          value: "9200"
        - name: FLUENT_ELASTICSEARCH_SCHEME
          value: "http"
        resources:
          limits:
            memory: 512Mi
          requests:
            cpu: 100m
            memory: 200Mi
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
\`\`\`

## Security Implementation

### Network Policies

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: frontend-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      tier: frontend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          tier: backend
    ports:
    - protocol: TCP
      port: 8080
  - to:
    - namespaceSelector: {}
      podSelector:
        matchLabels:
          k8s-app: kube-dns
    ports:
    - protocol: UDP
      port: 53
\`\`\`

## Results & Metrics

### Performance
- **Request Latency P95**: < 200ms
- **Request Latency P99**: < 500ms
- **Uptime**: 99.95%
- **Max Concurrent Users**: 50,000+

### Cost Optimization
- **30% cost reduction** using Spot instances for non-critical workloads
- **40% storage cost savings** with gp3 EBS volumes
- **Resource utilization improved** from 40% to 75%

### Scalability
- Auto-scales from 3 to 50 pods based on traffic
- Cluster nodes auto-scale from 5 to 20 based on resource requirements
- Handled Black Friday traffic spike (10x normal load) without issues
    `,
    challenges: [
      "Managing costs with high availability requirements",
      "Ensuring zero-downtime deployments",
      "Monitoring and troubleshooting distributed systems",
      "Securing multi-tenant cluster"
    ],
    solutions: [
      "Spot instances for non-critical workloads",
      "Rolling updates with health checks",
      "Comprehensive monitoring with Prometheus/Grafana",
      "Network policies and Pod Security Standards"
    ]
  },
  {
    id: 'multi-cloud-iac',
    title: "Multi-Cloud Infrastructure",
    description: "Terraform modules cho AWS, Azure, và GCP với reusable patterns",
    tech: ["Terraform", "AWS", "Azure", "GCP", "Vault"],
    icon: "Cloud",
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-purple-500 to-pink-500",
    fullDescription: `
# Multi-Cloud Infrastructure as Code

## Project Overview

Xây dựng một thư viện Terraform modules để triển khai infrastructure consistently across AWS, Azure, và Google Cloud Platform. Project tập trung vào reusability, maintainability, và cloud-agnostic design patterns.

## Architecture Philosophy

### Cloud-Agnostic Design

Thay vì duplicate code cho mỗi cloud provider, chúng ta tạo abstraction layer:

\`\`\`
Application Requirements
         │
         ▼
  Cloud-Agnostic Module
         │
    ┌────┴────┐
    │         │
    ▼         ▼         ▼
  AWS      Azure      GCP
Provider  Provider  Provider
\`\`\`

## Module Structure

\`\`\`
terraform-modules/
├── aws/
│   ├── compute/
│   │   ├── ec2/
│   │   ├── ecs/
│   │   └── lambda/
│   ├── networking/
│   │   ├── vpc/
│   │   └── alb/
│   └── database/
│       ├── rds/
│       └── dynamodb/
├── azure/
│   ├── compute/
│   │   ├── vm/
│   │   ├── aci/
│   │   └── functions/
│   ├── networking/
│   │   ├── vnet/
│   │   └── application-gateway/
│   └── database/
│       ├── sql/
│       └── cosmos/
├── gcp/
│   ├── compute/
│   │   ├── compute-engine/
│   │   ├── cloud-run/
│   │   └── cloud-functions/
│   ├── networking/
│   │   ├── vpc/
│   │   └── load-balancer/
│   └── database/
│       ├── cloud-sql/
│       └── firestore/
└── abstractions/
    ├── compute/
    ├── networking/
    └── database/
\`\`\`

## Implementation Examples

### 1. Cloud-Agnostic Compute Module

\`\`\`hcl
# abstractions/compute/main.tf
variable "cloud_provider" {
  description = "Cloud provider: aws, azure, or gcp"
  type        = string
  validation {
    condition     = contains(["aws", "azure", "gcp"], var.cloud_provider)
    error_message = "Provider must be aws, azure, or gcp."
  }
}

variable "instance_config" {
  description = "Instance configuration"
  type = object({
    name          = string
    instance_type = string
    image         = string
    subnet_id     = string
    tags          = map(string)
  })
}

module "aws_instance" {
  count  = var.cloud_provider == "aws" ? 1 : 0
  source = "../../aws/compute/ec2"

  name          = var.instance_config.name
  instance_type = var.instance_config.instance_type
  ami           = var.instance_config.image
  subnet_id     = var.instance_config.subnet_id
  tags          = var.instance_config.tags
}

module "azure_vm" {
  count  = var.cloud_provider == "azure" ? 1 : 0
  source = "../../azure/compute/vm"

  name          = var.instance_config.name
  vm_size       = var.instance_config.instance_type
  image_id      = var.instance_config.image
  subnet_id     = var.instance_config.subnet_id
  tags          = var.instance_config.tags
}

module "gcp_instance" {
  count  = var.cloud_provider == "gcp" ? 1 : 0
  source = "../../gcp/compute/compute-engine"

  name          = var.instance_config.name
  machine_type  = var.instance_config.instance_type
  image         = var.instance_config.image
  subnetwork    = var.instance_config.subnet_id
  labels        = var.instance_config.tags
}

output "instance_id" {
  value = (
    var.cloud_provider == "aws" ? module.aws_instance[0].instance_id :
    var.cloud_provider == "azure" ? module.azure_vm[0].vm_id :
    module.gcp_instance[0].instance_id
  )
}
\`\`\`

### 2. AWS VPC Module

\`\`\`hcl
# aws/networking/vpc/main.tf
variable "vpc_config" {
  description = "VPC configuration"
  type = object({
    name               = string
    cidr_block         = string
    availability_zones = list(string)
    private_subnets    = list(string)
    public_subnets     = list(string)
    enable_nat_gateway = bool
    tags               = map(string)
  })
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_config.cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(
    var.vpc_config.tags,
    {
      Name = var.vpc_config.name
    }
  )
}

resource "aws_subnet" "private" {
  count             = length(var.vpc_config.private_subnets)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.vpc_config.private_subnets[count.index]
  availability_zone = var.vpc_config.availability_zones[count.index]

  tags = merge(
    var.vpc_config.tags,
    {
      Name = "\${var.vpc_config.name}-private-\${count.index + 1}"
      Tier = "private"
    }
  )
}

resource "aws_subnet" "public" {
  count                   = length(var.vpc_config.public_subnets)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.vpc_config.public_subnets[count.index]
  availability_zone       = var.vpc_config.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = merge(
    var.vpc_config.tags,
    {
      Name = "\${var.vpc_config.name}-public-\${count.index + 1}"
      Tier = "public"
    }
  )
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(
    var.vpc_config.tags,
    {
      Name = "\${var.vpc_config.name}-igw"
    }
  )
}

resource "aws_eip" "nat" {
  count  = var.vpc_config.enable_nat_gateway ? length(var.vpc_config.availability_zones) : 0
  domain = "vpc"

  tags = merge(
    var.vpc_config.tags,
    {
      Name = "\${var.vpc_config.name}-nat-eip-\${count.index + 1}"
    }
  )
}

resource "aws_nat_gateway" "main" {
  count         = var.vpc_config.enable_nat_gateway ? length(var.vpc_config.availability_zones) : 0
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = merge(
    var.vpc_config.tags,
    {
      Name = "\${var.vpc_config.name}-nat-\${count.index + 1}"
    }
  )

  depends_on = [aws_internet_gateway.main]
}

output "vpc_id" {
  value = aws_vpc.main.id
}

output "private_subnet_ids" {
  value = aws_subnet.private[*].id
}

output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}
\`\`\`

### 3. Azure Virtual Network Module

\`\`\`hcl
# azure/networking/vnet/main.tf
variable "vnet_config" {
  description = "Virtual Network configuration"
  type = object({
    name                = string
    resource_group_name = string
    location            = string
    address_space       = list(string)
    subnets = list(object({
      name           = string
      address_prefix = string
    }))
    tags = map(string)
  })
}

resource "azurerm_virtual_network" "main" {
  name                = var.vnet_config.name
  resource_group_name = var.vnet_config.resource_group_name
  location            = var.vnet_config.location
  address_space       = var.vnet_config.address_space

  tags = var.vnet_config.tags
}

resource "azurerm_subnet" "subnets" {
  for_each = { for subnet in var.vnet_config.subnets : subnet.name => subnet }

  name                 = each.value.name
  resource_group_name  = var.vnet_config.resource_group_name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = [each.value.address_prefix]
}

output "vnet_id" {
  value = azurerm_virtual_network.main.id
}

output "subnet_ids" {
  value = { for k, v in azurerm_subnet.subnets : k => v.id }
}
\`\`\`

## Multi-Cloud Deployment Example

### Using the Abstraction Layer

\`\`\`hcl
# environments/production/main.tf
locals {
  cloud_provider = "aws" # Can be aws, azure, or gcp
  
  common_tags = {
    Environment = "production"
    Project     = "multi-cloud-app"
    ManagedBy   = "terraform"
  }
}

module "compute" {
  source = "../../abstractions/compute"

  cloud_provider = local.cloud_provider

  instance_config = {
    name          = "app-server"
    instance_type = local.cloud_provider == "aws" ? "t3.medium" : local.cloud_provider == "azure" ? "Standard_B2s" : "n1-standard-2"
    image         = local.cloud_provider == "aws" ? "ami-xxxxx" : local.cloud_provider == "azure" ? "/subscriptions/.../images/app" : "projects/ubuntu-os-cloud/global/images/ubuntu-2004-lts"
    subnet_id     = module.networking.private_subnet_ids[0]
    tags          = local.common_tags
  }
}
\`\`\`

## State Management

### Remote State Configuration

\`\`\`hcl
# AWS S3 Backend
terraform {
  backend "s3" {
    bucket         = "terraform-state-bucket"
    key            = "multi-cloud/production/terraform.tfstate"
    region         = "ap-southeast-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

# Azure Storage Backend
terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfstatestorage"
    container_name       = "tfstate"
    key                  = "production.terraform.tfstate"
  }
}

# GCP GCS Backend
terraform {
  backend "gcs" {
    bucket = "terraform-state-bucket"
    prefix = "multi-cloud/production"
  }
}
\`\`\`

## Testing Strategy

### Terratest Example

\`\`\`go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestAWSVPCModule(t *testing.T) {
    terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
        TerraformDir: "../aws/networking/vpc",
        Vars: map[string]interface{}{
            "vpc_config": map[string]interface{}{
                "name":               "test-vpc",
                "cidr_block":         "10.0.0.0/16",
                "availability_zones": []string{"ap-southeast-1a", "ap-southeast-1b"},
                "private_subnets":    []string{"10.0.1.0/24", "10.0.2.0/24"},
                "public_subnets":     []string{"10.0.101.0/24", "10.0.102.0/24"},
                "enable_nat_gateway": true,
                "tags": map[string]string{
                    "Environment": "test",
                },
            },
        },
    })

    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)

    vpcId := terraform.Output(t, terraformOptions, "vpc_id")
    assert.NotEmpty(t, vpcId)

    privateSubnetIds := terraform.OutputList(t, terraformOptions, "private_subnet_ids")
    assert.Equal(t, 2, len(privateSubnetIds))
}
\`\`\`

## Cost Management

### Cost Tracking with Tags

\`\`\`hcl
locals {
  required_tags = {
    CostCenter  = var.cost_center
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = var.owner_email
  }
}

resource "aws_instance" "example" {
  # ... other configuration ...

  tags = merge(
    local.required_tags,
    var.additional_tags,
    {
      Name = "\${var.project_name}-\${var.environment}-instance"
    }
  )
}
\`\`\`

## Key Achievements

- **Reduced deployment time** from days to hours across all clouds
- **Standardized infrastructure** patterns across AWS, Azure, and GCP
- **40% reduction in configuration drift** through consistent modules
- **Improved disaster recovery** with multi-cloud redundancy
- **Cost visibility** improved through consistent tagging strategy

## Lessons Learned

1. **Abstraction có trade-offs**: Quá nhiều abstraction làm giảm flexibility
2. **Testing là critical**: Automated testing catches breaking changes early
3. **Documentation is key**: Good docs giúp team adoption
4. **Start simple**: Begin với core modules, expand gradually
5. **Cloud differences matter**: Một số services không có equivalent trên other clouds
    `,
    challenges: [
      "Balancing abstraction vs flexibility",
      "Handling cloud-specific features",
      "Managing state across multiple clouds",
      "Cost optimization strategies"
    ],
    solutions: [
      "Layered module architecture",
      "Cloud-specific modules with common interface",
      "Separate state backends per cloud",
      "Comprehensive tagging and cost allocation"
    ]
  }
]

export const getProject = (id) => {
  return projects.find(project => project.id === id)
}
