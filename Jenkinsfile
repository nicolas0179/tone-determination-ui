pipeline {
    environment {
        IMAGE_NAME = "tone-determination-ui"
        registryCredentialsId = 'docker-jenkins'
        dockerImage = ''
    }
    agent any

    stages {
        stage ('Checkout'){
            steps {
                checkout scm
            }
        }

        stage ('Build') {
            steps{
                script {
                  dockerImage = docker.build IMAGE_NAME
                }
            }
        }

        stage ('Deploy') {
            steps {
                script {
                    docker.withRegistry('https://vps-20c3d535.vps.ovh.net/v2', registryCredentialsId) {
                        dockerImage.push("$BUILD_NUMBER")
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }
}
