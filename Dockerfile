FROM nginx
RUN mkdir /app
COPY ./dist /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx/1_nuc.plus_bundle.crt  /etc/nginx/1_nuc.plus_bundle.crt
COPY nginx/2_nuc.plus.key  /etc/nginx/2_nuc.plus.key