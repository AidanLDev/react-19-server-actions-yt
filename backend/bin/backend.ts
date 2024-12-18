#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/backend-stack';
import * as dotenv from "dotenv";

dotenv.config();

const environment: cdk.Environment = {
  account: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION
}

const app = new cdk.App();
new BackendStack(app, 'BackendStack', {
  env: environment,
  terminationProtection: false
});