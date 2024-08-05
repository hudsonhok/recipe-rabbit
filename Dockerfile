# pull official base image
FROM python:3.11-alpine

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install -U setuptools
RUN pip install --no-cache-dir -r requirements.txt


# copy project
COPY . .

#EXPOSE 8000

#COPY ./entrypoint.sh .
#ENTRYPOINT ["sh", "/app/entrypoint.sh"]