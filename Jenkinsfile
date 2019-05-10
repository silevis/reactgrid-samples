pipeline {
  agent any
  stages {
    stage('npm') {	
      steps {	
        bat 'npm install'	
      }
    }
  }

  options {
    disableConcurrentBuilds()
  }

  post {
    success {
      script {
        if (env.BRANCH_NAME == 'cleanup') {
          bat "netstat -ano | findstr 0.0.0.0:3000 && (FOR /F \"tokens=5\" %%I IN ('netstat -ano ^| findstr 0.0.0.0:3000') DO taskkill /F /PID %%I) || cmd/k"
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
          powershell "Start-Process -FilePath 'npm' -WorkingDirectory 'c:/users/lenovo/desktop/dynagrid' -ArgumentList 'run'"
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