pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm config set registry https://registry.npm.taobao.org'
                sh 'npm ci && npm run build'
            }
        }
        stage('deploy') {
            steps {
                sh 'chmod +x deploy.sh'
                sh './deploy.sh'
            }
        }
    }
}