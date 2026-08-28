import React from 'react'
import {
  siAnsible, siDocker, siElasticsearch, siGithubactions, siGnubash,
  siGooglecloud, siGrafana, siHelm, siJavascript, siJenkins, siKubernetes,
  siPrometheus, siPython, siTerraform, siYaml,
} from 'simple-icons'

const icons = {
  GCP: siGooglecloud, Docker: siDocker, Kubernetes: siKubernetes, Helm: siHelm,
  Jenkins: siJenkins, Actions: siGithubactions, Terraform: siTerraform,
  Ansible: siAnsible, Prometheus: siPrometheus, Grafana: siGrafana,
  ELK: siElasticsearch, Python: siPython, Bash: siGnubash, YAML: siYaml,
  JS: siJavascript,
}

export default function BrandLogo({ name, size = 38 }) {
  if (name === 'AWS') return <svg width={size + 8} height={size} viewBox="0 0 64 40" role="img" aria-label="AWS logo"><text x="4" y="25" fill="#232f3e" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700">aws</text><path d="M10 30c12 8 31 8 44-1" fill="none" stroke="#ff9900" strokeWidth="3" strokeLinecap="round"/><path d="m49 28 6 1-3 5" fill="none" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  if (name === 'Azure') return <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Microsoft Azure logo"><path fill="#0089D6" d="M19.1 5 7.3 15.2 1 26.4h10.7L19.1 5Z"/><path fill="#0078D4" d="m21.4 8.1-8.9 25.7L31.8 36 21.4 8.1Z"/><path fill="#50E6FF" d="M20.5 28.4 31.8 36 47 36 39.2 25.2 20.5 28.4Z"/></svg>
  const icon = icons[name]
  if (!icon) return null
  return <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={`${name} logo`} style={{ color: `#${icon.hex}` }}><path fill="currentColor" d={icon.path}/></svg>
}
