pipeline{
    agent any
    stages{

        stage('Checkout'){
            steps{
                git branch: 'main', url: 'https://github.com/tdd75/learning-app'
            }
        }

        stage('Test'){
            steps{
                echo 'test'
            }
        }
            
        stage('Build'){
            steps{
                withDockerRegistry(credentialsId: 'docker-hub-duytd', url: 'https://index.docker.io/v1/') {
                    echo 'start build ...'
                    sh 'docker build -t tdd75/app-image:1.0.0 .'
                    sh 'docker push tdd75/app-image:1.0.0'
                }
            }
        }
            
        stage('Deploy'){
            steps{
                echo 'start deploy ...'
                
                sshagent(['ssh-remote']){
                    sh 'ssh -o StrictHostKeyChecking=no -l long 13.70.60.235 "docker stop app-container && docker rm app-container"'
                    sh 'ssh -o StrictHostKeyChecking=no -l long 13.70.60.235 "docker run -d -p 8091:8091 --name app-container tdd75/app-image:1.0.0"'
                }
            }
        }
    }
}