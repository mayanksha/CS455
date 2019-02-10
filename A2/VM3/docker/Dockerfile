FROM ubuntu:16.04
ARG SERVER_PORT=9000
ENV NPM_CONFIG_LOGLEVEL=${NPM_CONFIG_LOGLEVEL:-info}  \
    NODE_VERSION=${NODE_VERSION:-8.12.0}              \
    SVC_USER=${SVC_USER:-node}												\
    SERVER_PORT=${SERVER_PORT}

ARG SVC_USER="virtual_machine3"
RUN \
\
##  Create the node.js system user \
##  --------------------------------------------------------------------------------  ## \
  groupadd  --system            \
            --force             \
            --gid 1000          \
            "${SVC_USER}"       \
 && useradd --system            \
            --uid 1000          \
            --gid "${SVC_USER}" \
            --shell /bin/bash   \
            --create-home       \
            "${SVC_USER}"       \
\
##  Updates Setup                   \
##  --------------------------------------------------------------------------------  ## \
 #&& sed -i 's/archive.ubuntu.com/mirror.cse.iitk.ac.in/g' /etc/apt/sources.list \
 #&& sed -i 's/security.ubuntu.com/mirror.cse.iitk.ac.in/g' /etc/apt/sources.list \
 && sed -i 's/archive.ubuntu.com/172.27.16.119/g' /etc/apt/sources.list \
 && sed -i 's/security.ubuntu.com/172.27.16.119/g' /etc/apt/sources.list \
 && apt-get -q update               \
            --assume-yes            \
 && echo -e "\n\tChanged Mirror to IITK, DEPLOYED: UPDATES \n" \
\
##  Tools Setup                     \
##  --------------------------------------------------------------------------------  ## \
 && apt-get install                 \
            --assume-yes            \
            --no-install-recommends \
            curl                    \
            mc                      \
            wget                    \
            git                     \
            htop                    \
            ca-certificates					\
 && echo -e "\n\tDEPLOYED: \t TOOLS \n" \
\
##  Cleanup                         \
##  --------------------------------------------------------------------------------  ## \
 && apt-get autoremove              \
 && apt-get clean                   \
 && rm -rf /var/lib/apt/lists/*     \
 && echo -e "\n\tCLEANED: \t APT CACHES \n" \
\
##  Node.js Setup                 */\
##  --------------------------------------------------------------------------------  ## \
 && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
 && apt-get install -y nodejs \
 && node -v										\
 && echo -e "\n\n\tDEPLOYED: \t Node.js:$(/usr/bin/node -v) for linux-${ARCH} \n\n"                      

WORKDIR /app
RUN APP_NAME=CS455			            \
 && git clone https://github.com/mayanksha/${APP_NAME}.git \
 && cd ${APP_NAME}/A2/VM3	          \
 && export VM_DIR=$(pwd)						\
 && echo 														\
 && echo -e "\n\tDEPLOYED: \t VM3 Application \n"

##  Communication
##  --------------------------------------------------------------------------------  ##
WORKDIR /app/CS455/A2/VM3
EXPOSE 4200 
RUN ["pwd"]
#RUN ["node", "app.js"]
#RUN ["node", "A2/VM2/app.js"]
## Set /usr/bin/node as the Dockerized entry-point Application

WORKDIR /app/CS455/A2/VM3
RUN ["bash", "./build_script.sh"]
CMD ["node", "app.js"];
