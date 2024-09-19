pipeline{
    agent any
    tools{
        mavan'local_maven'
    }

    stages{
        stage ('Build'){
            steps{
                sh 'mvn clean package'
            }
            post{
                success{
                    echo "Archiving the Artifacts"
                    archiveArtifacts artifacts: '**/target/*.war'
                }
        
                
            }
        }
        stage ('Deploy to tomcat server') {
            steps{
                https://github.com/Tezaswini-1247/Integrated-Dashboard.git
            }
        }
    }
}