variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "app_count" {
  type = number
  default = 1
}

variable "database_name" {
    type    = string
    default = "todo-app"
}

variable "database_username" {
    type    = string
    default = "todo_app"
}

variable "database_password" {
    type    = string
    default = "password"
}

