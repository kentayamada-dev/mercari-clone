ARG VARIANT=3.10-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/python:0-${VARIANT}
ENV PYTHONUNBUFFERED 1
ARG NODE_VERSION="16"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi
COPY backend/requirements.txt /tmp/pip-tmp/
RUN /usr/local/bin/python3 -m pip install --upgrade pip \
   && pip3 --disable-pip-version-check --no-cache-dir install -r /tmp/pip-tmp/requirements.txt \
   && rm -rf /tmp/pip-tmp \
   && pip3 --disable-pip-version-check --no-cache-dir install pytest pytest-cov freeport
RUN curl https://cli-assets.heroku.com/install.sh | sh
