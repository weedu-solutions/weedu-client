provider "aws" {
  region = "us-east-1"
}

module "cloudfront_s3_website_without_domain" {
    source                 = "../../"
    domain_name            = "weedu-client" // Any random identifier for s3 bucket name
    use_default_domain     = true
    upload_sample_file     = true
}