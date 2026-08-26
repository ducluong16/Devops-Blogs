export const blogPosts = [
  {
    id: 'kubernetes-aws-eks',
    title: "Triển khai Kubernetes Production-Ready trên AWS EKS",
    excerpt: "Hướng dẫn chi tiết cách setup một Kubernetes cluster production với high availability, auto-scaling và security best practices.",
    date: "2024-11-10",
    readTime: "12 phút",
    category: "Kubernetes",
    tags: ["Kubernetes", "AWS", "EKS", "DevOps"],
    gradient: "from-blue-500 to-cyan-500",
    author: "Phạm Đức Lương",
    content: `
# Triển khai Kubernetes Production-Ready trên AWS EKS

## Giới thiệu

Amazon EKS (Elastic Kubernetes Service) là dịch vụ Kubernetes được quản lý hoàn toàn bởi AWS, giúp bạn dễ dàng chạy Kubernetes trên AWS mà không cần cài đặt và vận hành control plane của Kubernetes.

## Kiến trúc hệ thống

### 1. VPC và Networking

Đầu tiên, chúng ta cần thiết lập VPC với architecture phù hợp:

\`\`\`hcl
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "eks-vpc"
  }
}

resource "aws_subnet" "private" {
  count             = 3
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name                              = "eks-private-\${count.index}"
    "kubernetes.io/role/internal-elb" = "1"
  }
}
\`\`\`

### 2. EKS Cluster Setup

Tạo EKS cluster với Terraform:

\`\`\`hcl
resource "aws_eks_cluster" "main" {
  name     = "production-cluster"
  role_arn = aws_iam_role.cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids              = aws_subnet.private[*].id
    endpoint_private_access = true
    endpoint_public_access  = true
    public_access_cidrs    = ["0.0.0.0/0"]
  }

  enabled_cluster_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]
}
\`\`\`

## High Availability

### Multi-AZ Deployment

Deploy node groups across multiple availability zones:

\`\`\`yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: production-cluster
  region: ap-southeast-1

managedNodeGroups:
  - name: ng-1
    instanceType: t3.large
    minSize: 2
    maxSize: 10
    desiredCapacity: 3
    volumeSize: 50
    availabilityZones: ["ap-southeast-1a", "ap-southeast-1b", "ap-southeast-1c"]
    labels:
      role: worker
    tags:
      nodegroup-role: worker
\`\`\`

### Auto Scaling

Cấu hình Cluster Autoscaler:

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
      - image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.28.0
        name: cluster-autoscaler
        command:
          - ./cluster-autoscaler
          - --v=4
          - --stderrthreshold=info
          - --cloud-provider=aws
          - --skip-nodes-with-local-storage=false
          - --expander=least-waste
          - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/production-cluster
\`\`\`

## Security Best Practices

### 1. IAM Roles for Service Accounts (IRSA)

\`\`\`bash
eksctl create iamserviceaccount \\
  --name ebs-csi-controller-sa \\
  --namespace kube-system \\
  --cluster production-cluster \\
  --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \\
  --approve \\
  --role-only \\
  --role-name AmazonEKS_EBS_CSI_DriverRole
\`\`\`

### 2. Pod Security Standards

\`\`\`yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
\`\`\`

### 3. Network Policies

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
\`\`\`

## Monitoring và Logging

### Prometheus và Grafana

Install Prometheus stack với Helm:

\`\`\`bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack \\
  --namespace monitoring \\
  --create-namespace \\
  --set prometheus.prometheusSpec.retention=30d \\
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=100Gi
\`\`\`

### Fluent Bit for Logging

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluent-bit-config
  namespace: logging
data:
  fluent-bit.conf: |
    [SERVICE]
        Flush         5
        Log_Level     info
        Daemon        off

    [INPUT]
        Name              tail
        Path              /var/log/containers/*.log
        Parser            docker
        Tag               kube.*
        Refresh_Interval  5

    [FILTER]
        Name                kubernetes
        Match               kube.*
        Kube_URL            https://kubernetes.default.svc:443
        Kube_CA_File        /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        Kube_Token_File     /var/run/secrets/kubernetes.io/serviceaccount/token

    [OUTPUT]
        Name  es
        Match *
        Host  elasticsearch.logging.svc
        Port  9200
        Index fluent-bit
\`\`\`

## Backup và Disaster Recovery

### Velero Setup

\`\`\`bash
velero install \\
  --provider aws \\
  --plugins velero/velero-plugin-for-aws:v1.8.0 \\
  --bucket eks-backup-bucket \\
  --backup-location-config region=ap-southeast-1 \\
  --snapshot-location-config region=ap-southeast-1 \\
  --secret-file ./credentials-velero
\`\`\`

Schedule automated backups:

\`\`\`bash
velero schedule create daily-backup \\
  --schedule="0 2 * * *" \\
  --include-namespaces production,staging \\
  --ttl 720h0m0s
\`\`\`

## Kết luận

Việc triển khai EKS cluster production-ready đòi hỏi sự chú ý đến nhiều khía cạnh: networking, security, monitoring, backup. Bằng cách tuân thủ các best practices trên, bạn có thể xây dựng một hệ thống Kubernetes ổn định, bảo mật và dễ quản lý trên AWS.

## Resources

- [AWS EKS Best Practices Guide](https://aws.github.io/aws-eks-best-practices/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [eksctl Documentation](https://eksctl.io/)
    `
  },
  {
    id: 'gitops-argocd',
    title: "GitOps với ArgoCD: Automated Deployment Strategy",
    excerpt: "Khám phá cách sử dụng ArgoCD để implement GitOps workflow, tự động hóa deployment và đảm bảo consistency giữa Git và cluster state.",
    date: "2024-11-05",
    readTime: "10 phút",
    category: "CI/CD",
    tags: ["ArgoCD", "GitOps", "CI/CD", "Kubernetes"],
    gradient: "from-purple-500 to-pink-500",
    author: "Phạm Đức Lương",
    content: `
# GitOps với ArgoCD: Automated Deployment Strategy

## GitOps là gì?

GitOps là một paradigm để quản lý infrastructure và application deployments bằng cách sử dụng Git repositories như single source of truth. Mọi thay đổi đều được track trong Git và tự động sync với cluster.

## Tại sao chọn ArgoCD?

ArgoCD là một declarative, GitOps continuous delivery tool cho Kubernetes với những ưu điểm:

- **Declarative setup**: Toàn bộ configuration trong Git
- **Automated sync**: Tự động phát hiện drift và sync
- **Visual UI**: Dashboard trực quan để theo dõi deployments
- **Multi-cluster support**: Quản lý nhiều clusters từ một nơi
- **RBAC**: Fine-grained access control

## Cài đặt ArgoCD

### 1. Install ArgoCD

\`\`\`bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
\`\`\`

### 2. Expose ArgoCD Server

\`\`\`bash
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
\`\`\`

### 3. Get initial admin password

\`\`\`bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
\`\`\`

## Repository Structure

Tổ chức Git repository theo structure sau:

\`\`\`
gitops-repo/
├── apps/
│   ├── production/
│   │   ├── frontend/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── ingress.yaml
│   │   └── backend/
│   │       ├── deployment.yaml
│   │       ├── service.yaml
│   │       └── configmap.yaml
│   └── staging/
│       └── ...
├── infrastructure/
│   ├── namespaces/
│   ├── monitoring/
│   └── ingress-controller/
└── argocd/
    ├── applications/
    └── projects/
\`\`\`

## Tạo ArgoCD Application

### Application Manifest

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: frontend-production
  namespace: argocd
spec:
  project: production
  source:
    repoURL: https://github.com/yourorg/gitops-repo.git
    targetRevision: main
    path: apps/production/frontend
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
    - CreateNamespace=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
\`\`\`

### App of Apps Pattern

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: production-apps
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/yourorg/gitops-repo.git
    targetRevision: main
    path: argocd/applications/production
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
\`\`\`

## CI/CD Integration

### GitLab CI Pipeline

\`\`\`yaml
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - docker build -t myapp:$CI_COMMIT_SHA .
    - docker push myapp:$CI_COMMIT_SHA

update-manifest:
  stage: deploy
  script:
    - git clone https://github.com/yourorg/gitops-repo.git
    - cd gitops-repo/apps/production/frontend
    - sed -i "s|image:.*|image: myapp:$CI_COMMIT_SHA|g" deployment.yaml
    - git add deployment.yaml
    - git commit -m "Update image to $CI_COMMIT_SHA"
    - git push origin main
\`\`\`

## Secrets Management

### Sealed Secrets

\`\`\`bash
# Install Sealed Secrets controller
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml

# Create sealed secret
echo -n mypassword | kubectl create secret generic mysecret \\
  --dry-run=client \\
  --from-file=password=/dev/stdin \\
  -o yaml | \\
  kubeseal -o yaml > sealed-secret.yaml
\`\`\`

### External Secrets Operator

\`\`\`yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-secrets
  namespace: production
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: app-secrets
    creationPolicy: Owner
  data:
  - secretKey: database-password
    remoteRef:
      key: prod/database
      property: password
\`\`\`

## Multi-Environment Strategy

### Kustomize Overlays

Base configuration:
\`\`\`yaml
# base/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 2
  template:
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
\`\`\`

Production overlay:
\`\`\`yaml
# overlays/production/kustomization.yaml
resources:
- ../../base

replicas:
- name: myapp
  count: 5

patches:
- patch: |-
    - op: replace
      path: /spec/template/spec/containers/0/resources/requests/memory
      value: "512Mi"
  target:
    kind: Deployment
    name: myapp
\`\`\`

## Monitoring và Notifications

### Prometheus Metrics

ArgoCD expose metrics cho Prometheus:
\`\`\`yaml
apiVersion: v1
kind: ServiceMonitor
metadata:
  name: argocd-metrics
  namespace: argocd
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: argocd-metrics
  endpoints:
  - port: metrics
\`\`\`

### Slack Notifications

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
  namespace: argocd
data:
  service.slack: |
    token: $slack-token
  trigger.on-deployed: |
    - when: app.status.operationState.phase in ['Succeeded']
      send: [app-deployed]
  template.app-deployed: |
    message: |
      Application {{.app.metadata.name}} is now running new version.
    slack:
      attachments: |
        [{
          "title": "{{.app.metadata.name}}",
          "title_link": "{{.context.argocdUrl}}/applications/{{.app.metadata.name}}",
          "color": "#18be52",
          "fields": [{
            "title": "Sync Status",
            "value": "{{.app.status.sync.status}}",
            "short": true
          }]
        }]
\`\`\`

## Best Practices

1. **Separation of Concerns**: Tách Git repo cho app code và manifests
2. **Environment Promotion**: Use branches/tags cho mỗi environment
3. **Automated Sync**: Enable auto-sync với prune và self-heal
4. **Health Checks**: Define custom health checks cho resources
5. **RBAC**: Implement least privilege access
6. **Backup**: Regular backup ArgoCD configuration

## Troubleshooting

### Application out of sync

\`\`\`bash
# Force sync
argocd app sync myapp --force

# Diff between Git and cluster
argocd app diff myapp

# Get sync status
argocd app get myapp
\`\`\`

### Failed sync operations

\`\`\`bash
# View sync logs
kubectl logs -n argocd deployment/argocd-repo-server

# Check application events
kubectl describe application myapp -n argocd
\`\`\`

## Kết luận

ArgoCD giúp implement GitOps workflow một cách hiệu quả, mang lại automation, consistency và traceability cho deployment process. Bằng cách kết hợp với CI/CD pipeline và secrets management, bạn có thể xây dựng một hệ thống deployment hoàn chỉnh và production-ready.
    `
  },
  {
    id: 'terraform-best-practices',
    title: "Infrastructure as Code với Terraform: Best Practices",
    excerpt: "Tổng hợp các best practices khi làm việc với Terraform: module design, state management, testing và CI/CD integration.",
    date: "2024-10-28",
    readTime: "15 phút",
    category: "IaC",
    tags: ["Terraform", "IaC", "AWS", "Multi-Cloud"],
    gradient: "from-orange-500 to-red-500",
    author: "Phạm Đức Lương",
    content: `
# Infrastructure as Code với Terraform: Best Practices

## Introduction

Terraform đã trở thành công cụ IaC phổ biến nhất để quản lý infrastructure across multiple cloud providers. Bài viết này tổng hợp các best practices đã được kiểm chứng trong môi trường production.

## Project Structure

### Recommended Directory Layout

\`\`\`
terraform-project/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── terraform.tfvars
│   ├── staging/
│   └── prod/
├── modules/
│   ├── vpc/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   ├── eks/
│   └── rds/
├── global/
│   ├── iam/
│   └── s3/
└── README.md
\`\`\`

## State Management

### Remote State với S3 Backend

\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "mycompany-terraform-state"
    key            = "prod/vpc/terraform.tfstate"
    region         = "ap-southeast-1"
    encrypt        = true
    dynamodb_table = "terraform-lock"
    kms_key_id     = "arn:aws:kms:ap-southeast-1:123456789:key/xxx"
  }
}
\`\`\`

### State Locking với DynamoDB

\`\`\`hcl
resource "aws_dynamodb_table" "terraform_lock" {
  name           = "terraform-lock"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name        = "Terraform State Lock Table"
    Environment = "global"
  }
}
\`\`\`

## Module Design

### Reusable VPC Module

\`\`\`hcl
# modules/vpc/main.tf
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "\${var.environment}-vpc"
    Environment = var.environment
  }
}

resource "aws_subnet" "private" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name        = "\${var.environment}-private-\${count.index + 1}"
    Environment = var.environment
    Tier        = "private"
  }
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "private_subnet_ids" {
  description = "IDs of private subnets"
  value       = aws_subnet.private[*].id
}
\`\`\`

### Using the Module

\`\`\`hcl
# environments/prod/main.tf
module "vpc" {
  source = "../../modules/vpc"

  vpc_cidr           = "10.0.0.0/16"
  environment        = "production"
  availability_zones = ["ap-southeast-1a", "ap-southeast-1b", "ap-southeast-1c"]
}

module "eks" {
  source = "../../modules/eks"

  cluster_name    = "prod-cluster"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnet_ids
  cluster_version = "1.28"
}
\`\`\`

## Variable Management

### Variable Validation

\`\`\`hcl
variable "instance_type" {
  description = "EC2 instance type"
  type        = string

  validation {
    condition     = can(regex("^t[23]\\\\.", var.instance_type))
    error_message = "Instance type must be t2 or t3 family."
  }
}

variable "environment" {
  description = "Environment name"
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}
\`\`\`

### Using tfvars Files

\`\`\`hcl
# environments/prod/terraform.tfvars
region             = "ap-southeast-1"
environment        = "prod"
vpc_cidr           = "10.0.0.0/16"
instance_type      = "t3.large"
min_size           = 3
max_size           = 10
desired_capacity   = 5

tags = {
  Project     = "MyApp"
  CostCenter  = "Engineering"
  ManagedBy   = "Terraform"
}
\`\`\`

## Resource Naming Convention

\`\`\`hcl
locals {
  common_tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
    Project     = var.project_name
  }

  name_prefix = "\${var.project_name}-\${var.environment}"
}

resource "aws_s3_bucket" "app_data" {
  bucket = "\${local.name_prefix}-app-data"
  
  tags = merge(
    local.common_tags,
    {
      Name = "\${local.name_prefix}-app-data"
      Type = "application-data"
    }
  )
}
\`\`\`

## Data Sources

\`\`\`hcl
# Get latest Amazon Linux 2 AMI
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Get current AWS account ID
data "aws_caller_identity" "current" {}

# Get available AZs
data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = var.instance_type

  tags = {
    Name      = "\${var.environment}-app-server"
    AccountID = data.aws_caller_identity.current.account_id
  }
}
\`\`\`

## Terraform Testing

### Terratest Example

\`\`\`go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestVPCModule(t *testing.T) {
    terraformOptions := &terraform.Options{
        TerraformDir: "../modules/vpc",
        Vars: map[string]interface{}{
            "vpc_cidr":           "10.0.0.0/16",
            "environment":        "test",
            "availability_zones": []string{"ap-southeast-1a", "ap-southeast-1b"},
        },
    }

    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)

    vpcId := terraform.Output(t, terraformOptions, "vpc_id")
    assert.NotEmpty(t, vpcId)

    subnetIds := terraform.OutputList(t, terraformOptions, "private_subnet_ids")
    assert.Equal(t, 2, len(subnetIds))
}
\`\`\`

## CI/CD Integration

### GitLab CI Pipeline

\`\`\`yaml
stages:
  - validate
  - plan
  - apply

variables:
  TF_ROOT: \${CI_PROJECT_DIR}/environments/prod

before_script:
  - cd \${TF_ROOT}
  - terraform --version
  - terraform init

validate:
  stage: validate
  script:
    - terraform fmt -check
    - terraform validate
    - tflint

plan:
  stage: plan
  script:
    - terraform plan -out=tfplan
  artifacts:
    paths:
      - \${TF_ROOT}/tfplan
  only:
    - merge_requests
    - main

apply:
  stage: apply
  script:
    - terraform apply -auto-approve tfplan
  dependencies:
    - plan
  only:
    - main
  when: manual
\`\`\`

### GitHub Actions

\`\`\`yaml
name: Terraform

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  terraform:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: 1.6.0
    
    - name: Terraform Init
      run: terraform init
      working-directory: ./environments/prod
    
    - name: Terraform Format
      run: terraform fmt -check
      working-directory: ./environments/prod
    
    - name: Terraform Plan
      run: terraform plan -no-color
      working-directory: ./environments/prod
      env:
        AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
    
    - name: Terraform Apply
      if: github.ref == 'refs/heads/main' && github.event_name == 'push'
      run: terraform apply -auto-approve
      working-directory: ./environments/prod
      env:
        AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
\`\`\`

## Security Best Practices

### Sensitive Data

\`\`\`hcl
variable "database_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

resource "aws_db_instance" "main" {
  password = var.database_password
  # Other configuration...
}

output "db_endpoint" {
  value     = aws_db_instance.main.endpoint
  sensitive = false
}

output "db_password" {
  value     = aws_db_instance.main.password
  sensitive = true
}
\`\`\`

### Use AWS Secrets Manager

\`\`\`hcl
data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = "prod/database/password"
}

resource "aws_db_instance" "main" {
  password = jsondecode(data.aws_secretsmanager_secret_version.db_password.secret_string)["password"]
}
\`\`\`

## Kết luận

Terraform là công cụ mạnh mẽ, nhưng để sử dụng hiệu quả cần tuân thủ các best practices về structure, state management, testing và security. Những patterns trên đã được áp dụng thành công trong nhiều dự án production scale.
    `
  }
]

export const getBlogPost = (id) => {
  return blogPosts.find(post => post.id === id)
}
