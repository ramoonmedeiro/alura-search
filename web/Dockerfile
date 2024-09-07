FROM python:3.9-slim

WORKDIR /root

COPY . /root/

RUN python3 -m pip install --upgrade pip
RUN pip3 install -r /root/web/requirements.txt

EXPOSE 5000

ENV PYTHONUNBUFFERED=1

ENTRYPOINT ["python3", "web/main.py"]