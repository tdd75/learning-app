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

                    sh 'docker-compose build'
                    sh 'docker-compose push'

                }
            }
        }
            
        stage('Deploy'){
            steps{
                echo 'start deploy ...'
                
                sshagent(['ssh-remote']){
                    sh 'ssh -o StrictHostKeyChecking=no -l long 13.70.60.235 "docker stop $(docker ps -a -q) || true && docker rm $(docker ps -a -q) || true"' 
                    sh 'ssh -o StrictHostKeyChecking=no -l long 13.70.60.235 "wget -O docker-compose.yml https://github.com/tdd75/learning-app/blob/main/docker-compose.yml && docker-compose up"'
                }
            }
        }
    }
}