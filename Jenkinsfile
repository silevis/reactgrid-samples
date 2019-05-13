pipeline {
  agent any
  stages {
    stage('npm') {	
      steps {	
        bat 'npm install'	
      }
    }

    stage('update files') {
      steps {
        script {
          if (env.BRANCH_NAME == 'cleanup') {
            powershell 'Remove-Item -Recurse -Force node_modules'
            fileOperations([fileCopyOperation(	
              excludes: "",
              flattenFiles: false,	
              includes: "**/*",	
              targetLocation: "c:/users/lenovo/desktop/dynagrid"	
            )])
            dir(path: 'c:/users/lenovo/desktop/dynagrid') {
              bat "npm install"
            }
          }
        }
      }
    }
    
    stage('tests') {
      steps {
        dir(path: 'c:/users/lenovo/desktop/dynagrid') {
          bat "npm test:automatic"
        }
      }
    }
  }

  options {
    disableConcurrentBuilds()
  }

  post {
    cleanup {
      /* clean up our workspace */
      deleteDir()
      dir("${workspace}@tmp") {
        deleteDir()
      }
      dir("${workspace}@script") {
        deleteDir()
      }
      dir("${workspace}@script@tmp") {
        deleteDir()
      }
    }

    failure {
      emailext(to: 'piotr.mikosza@silevis.com', subject: "${env.JOB_NAME} ended with failure!", body: "Somethin was wrong! \n\nConsole: ${env.BUILD_URL}.\n\n")
    }
  }

  tools {
    nodejs 'node-v10.15.3'
  }
}