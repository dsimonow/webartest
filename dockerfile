FROM node:latest

RUN git clone https://github.com/dsimonow/webartest.git
WORKDIR /webartest
RUN npm install
RUN npm run build

EXPOSE 3000
EXPOSE 6006

CMD ["sh", "-c", "npm run dev & npm run storybook"]