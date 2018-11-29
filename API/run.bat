set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_121
set MAVEN_HOME=D:\softwares\apache-maven-3.6.0
set M2_HOME=D:\softwares\apache-maven-3.6.0
set path=%PATH%;%MAVEN_HOME%\bin
set path=%PATH%;%M2_HOME%\bin
set path=%PATH%;%JAVA_HOME%\bin

set env_val=%1
set EXEC_DIR=%CD%

@echo off 
set list=dummydatapush MC-POC-ACCOUNTS-MS-4 MC-POC-ANALYTICS-MS-5 MC-POC-CARDTRANSSIMULATOR-MS-1 MC-POC-ENROLLMENT-MS MC-POC-REDEMPTION-MS-2
(for %%a in (%list%) do ( 
   cd %EXEC_DIR%\%%a 
   start mvn spring-boot:run -Dspring.profiles.active=%env_val%
   timeout 20
))
cd %EXEC_DIR%