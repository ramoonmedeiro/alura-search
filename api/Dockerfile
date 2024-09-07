FROM python:3.9-slim

WORKDIR /root

COPY . /root

RUN python3 -m pip install --upgrade pip
RUN pip3 install -r /root/api/requirements.txt

EXPOSE 8000

ENTRYPOINT ["python3", "api/main.py"]