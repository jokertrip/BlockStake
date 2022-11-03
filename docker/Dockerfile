FROM ubuntu:20.04
LABEL version="1.0"
LABEL maintainer="druzhcom@pm.me"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install --yes software-properties-common wget apt-utils curl
RUN add-apt-repository ppa:ethereum/ethereum
RUN apt-get update && apt-get install --yes geth
# RUN adduser --disabled-login --gecos "" eth_book

# COPY distr /home/eth_book/distr
# RUN chown -R eth_book:eth_book /home/eth_book/distr

RUN cd ~
RUN wget https://github.com/sigp/lighthouse/releases/download/v3.1.0/lighthouse-v3.1.0-x86_64-unknown-linux-gnu.tar.gz
RUN tar xvf lighthouse-v3.1.0-x86_64-unknown-linux-gnu.tar.gz -C /root
RUN rm lighthouse-v3.1.0-x86_64-unknown-linux-gnu.tar.gz 
RUN cp ~/lighthouse /usr/local/bin
RUN rm ~/lighthouse

RUN mkdir -p /var/lib/lighthouse/keys/
RUN mkdir -p /var/lib/lighthouse/data/

ADD validator /var/lib/lighthouse/keys
ADD lighthousevalidator.service /etc/systemd/system

RUN mkdir -p /var/lib/ethereum
RUN openssl rand -hex 32 | tr -d "\n" | tee /var/lib/ethereum/jwttoken
RUN chmod +r /var/lib/ethereum/jwttoken

RUN useradd --no-create-home --shell /bin/false goeth
RUN mkdir -p /var/lib/goethereum
RUN chown -R goeth:goeth /var/lib/goethereum

# RUN systemctl daemon-reload
# RUN systemctl start geth.service
# RUN systemctl status geth.service
# RUN systemctl enable geth.service

RUN useradd --no-create-home --shell /bin/false lighthousebeacon
RUN useradd --no-create-home --shell /bin/false lighthousevalidator
RUN mkdir -p /var/lib/lighthouse
RUN mkdir -p /var/lib/lighthouse/validators
RUN chown -R lighthousebeacon:lighthousebeacon /var/lib/lighthouse
RUN chown -R lighthousevalidator:lighthousevalidator /var/lib/lighthouse/validators

# RUN systemctl daemon-reload
# RUN systemctl start lighthousebeacon.service
# RUN systemctl status lighthousebeacon.service
# RUN systemctl enable lighthousebeacon.service

# RUN systemctl daemon-reload
# RUN systemctl start lighthousevalidator.service
# RUN systemctl status lighthousevalidator.service
# RUN systemctl enable lighthousevalidator.service

# USER eth_book
# WORKDIR /home/eth_book
RUN geth \ 
    --goerli \
    --http \
    --http.api / \
    --http.corsdomain '*' \
    --datadir /var/lib/goethereum \ 
    --metrics \
    --metrics.expensive \
    --pprof \
    --authrpc.jwtsecret=/var/lib/ethereum/jwttoken &

# RUN /usr/local/bin/lighthouse bn \
#     --network prater \
#     --datadir /var/lib/lighthouse \
#     --http \
#     --execution-endpoint http://127.0.0.1:8551 \
#     --metrics \
#     --validator-monitor-auto \
#     --checkpoint-sync-url https://goerli.checkpoint-sync.ethdevops.io \
#     --execution-jwt /var/lib/ethereum/jwttoken

RUN /usr/local/bin/lighthouse account validator import \
    --network prater \
    --directory /var/lib/lighthouse/keys \
    --datadir /var/lib/lighthouse/data 

ENTRYPOINT bash
EXPOSE 8545