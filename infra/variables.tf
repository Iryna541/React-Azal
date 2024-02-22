variable "s3_bucket_name" {
  type        = string
  description = "The name of the S3 bucket for CodePipeline"
}

variable "codecommit_repo_arn" {
  type        = string
  description = "The ARN of the CodeCommit repository"
}

variable "codecommit_repo_name" {
  type        = string
  description = "The name of the CodeCommit repository"
}

variable "codepipeline_project_name" {
  type        = string
  description = "The name of the CodePipeline project"
}

variable "codepipeline_iam_role_name" {
  type        = string
  description = "The IAM role name for CodePipeline"
}

variable "codebuild_project_name" {
  type        = string
  description = "The name of the CodeBuild project"
}

variable "codebuild_iam_role_name" {
  type        = string
  description = "The IAM role name for CodeBuild"
}

variable "elasticbeanstalk_app_name" {
  type        = string
  description = "The name of the Elastic Beanstalk application"
}
