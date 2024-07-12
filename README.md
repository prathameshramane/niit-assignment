
# NIIT Assessment




## Problem Statement

#### Overview

A Real-time File Handling Application is a Node.js-based solution designed to efficiently manage large volumes of files by automatically splitting them into smaller, more manageable chunks. This approach facilitates easier storage and transfer of files

#### Requirements

- Develop a Node.js application that monitors an input folder for new files every 5 minutes.
- Every File found in the input folder should be converted/split into multiple chunks based on size (These chunks would be of 10mb) and stored in an output folder using Linux commands within the Node Application.
- If a file is already processed, it should not be processed again.
- As soon as the conversion is done, Application should compare the original file and the chunks to check if any data is lost during the conversion and print the output.

## Approach

#### Iterating through complete input folder at interval of 5 mins

- I have added a `setInterval` function which looks for changes every 5mins in `input` folder.
- The change is detected based on modified time of the file. If the file is modified that file will be again processed to divide it into chunks.
- For new files added to the folder, the modified time would be same as the created time.

#### Maintaining last modified time

- Last modified or the time at which the `setInterval` ran last time is persisted in order to avoid duplicate processing of same file.
- A file is sent for processing if it is modified or added between the execution interval.
- This would avoid sending same files twice for processing.

#### Maintaining the folder structure

- For user convinience, the folder structure is maintained as is.
- The divided chunks of the original files are also maintained in a single folder.

#### Verification of file

- For verification of the chunck files, we concat all the files again and compare them.
- We use Buffer compare methodology for comparing both files data.



## Run Script Locally

### Requirements
- docker
- docker-compose

### Clone Project

```bash
  git clone https://github.com/prathameshramane/niit-assignment.git
```

Go to the project directory

```bash
  cd niit-assignment
```

### Running the project using docker (Option 1)

#### Build the image

```bash
  docker build -t niit-app .
```

#### Run image on container

```bash
  docker run --name niit-app -v ${pwd}:/app niit-app
```

### Running the project using docker-compose (Option 2)

```bash
  docker-compose up
```
## Development Screenshots

Final output after processing the files

![alt text](https://github.com/prathameshramane/niit-assignment/blob/main/image.jpg?raw=true)
![alt text](https://github.com/prathameshramane/niit-assignment/blob/main/image.jpg?raw=true)
