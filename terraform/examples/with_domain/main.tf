provider "aws" {
  region = "us-east-1"
}


module "cloudfront_s3_website_with_domain" {
    source                 = "../../"
    hosted_zone            = "weedu.com.br" 
    domain_name            = "acao.weedu.com.br"
    acm_certificate_domain = "weedu.com.br"
    upload_sample_file     = true
}