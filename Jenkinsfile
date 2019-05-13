pipeline {
  agent any
  stages {
    stage('npm') {	
      steps {	
        bat 'npm ci'	
      }
    }

    stage('update files') {
      steps {
        script {
          powershell 'Remove-Item -Recurse -Force node_modules'
          fileOperations([fileCopyOperation(	
            excludes: "",
            flattenFiles: false,	
            includes: "**/*",	
            targetLocation: "c:/users/lenovo/desktop/dynagrid"	
          )])
          dir(path: 'c:/users/lenovo/desktop/dynagrid') {
            bat "npm ci"
          }
        }
      }
    }
    
    stage('tests') {
      steps {
        dir(path: 'c:/users/lenovo/desktop/dynagrid') {
          bat "npm run test:automatic"
        }
      }
    }
  }

  options {
    disableConcurrentBuilds()
  }

  post {
    success {
      script {
        if (env.BRANCH_NAME == 'develop') {
          bat "npm version patch && npm publish"
        }
       }  
    }

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