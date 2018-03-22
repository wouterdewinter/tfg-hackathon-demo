FROM continuumio/miniconda3
ENTRYPOINT [ "/bin/bash", "-c" ]

# Create environment with dependancies
COPY environment.yml /tmp/environment.yml
RUN conda env create -f /tmp/environment.yml

# Install Jupyter notebooks with conda support
RUN conda install jupyter -y --quiet
RUN conda install -y nb_conda

# Create working dir
COPY . /opt/src
WORKDIR /opt/src