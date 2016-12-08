FROM ibmcom/swift-ubuntu:latest
MAINTAINER IBM Swift Engineering at IBM Cloud
LABEL Description="Linux Ubuntu 14.04 image with the Swift binaries and DB2 driver"

WORKDIR $HOME
# Copy the application source code
COPY . $HOME
# Compile the application
RUN swift build -Xcc -fblocks --configuration release

EXPOSE 8090

CMD .build/release/kitura-quick-start

