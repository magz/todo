variable "aws_region" {
  type        = string
  default = "us-east-1"
}

variable "name" {
  description = "A name to use for resources."
  type        = string
  default = "magz"
}

variable "ecs_cpu" {
  description = "The CPU count for the ECS task."
  type        = number
  default     = 256
}

variable "ecs_memory" {
  description = "The memory count for the ECS task."
  type        = number
  default     = 512
}

variable "ecs_image" {
  description = "The Docker image to use for the ECS task."
  type        = string
  default     = "magz999/todo@sha256:08ca96628e068b4d47e5aef2903a185dc9ccaf4a383cab25f5214fa99d893f49"
}

variable "container_port" {
  description = "The TCP port the container is listening on."
  type        = number
  default     = 3000
}

variable "permissions_boundary" {
  description = "The ARN of an IAM permissions boundary to use for creating IAM resources."
  type        = string
  default     = null
}

variable "tags" {
  description = "Map of common tags to apply to resources."
  type        = map(any)
  default     = {}
}

variable "db_pass" {
  description = "The password for the database."
  type        = string
  default     = "foobarbaz"
}

variable "db_user" {
  description = "The username for the database."
  type        = string
  default     = "main"
}

variable "db_name" {
  description = "The name of the database."
  type        = string
  default     = "magz"
}