## Pharos Test Backend 1 (BE-1)
Perkenalkan nama saya Raka Janitra Arkaan saya seorang Backend Engineer, dan tidak menutup kemungkinan bisa sebagai Full-Stack Engineer. 
Untuk informasi lebih lanjut tentang saya dapat kunjugi:
1. Linkedin: https://www.linkedin.com/in/rakajanitraa/
2. Instagram: https://www.instagram.com/rakajanitraa/

## Postman
https://www.getpostman.com/collections/cedf7fc166bc9da873f3

## Struktur Folder Project
```
|-- pharos-test [Project API Task [Node.Js - Express.Js] - Repo: https://github.com/jrarkaan/pharos-test/ ] [2]
|   |-- .gitignore
|   |-- app.js
|   |-- package.json
|   |-- package-lock.json 
|   |-- utils
|   |   |-- tools_api.js
|   |   
|   |-- routes
|   |   |-- api_task.js
|   |
|   |-- middleware
|   |   |-- cors.js
|   |
|   |-- config
|   |   |-- database.js
|   |   |-- config.js [.gitignore]
|   |   |-- config.example.dev.js
|   |   |-- config.example.prod.js
|   |
|   |-- bin
|   |   |-- www.js
|   |
|   |-- DDL
|   |   |-- 22022-08-05 20:15:02.sql
|   |
|
|-- Dockerize - Repo: https://github.com/jrarkaan/Dockerize [1]
|   |-- mysql
|   |   |-- data
|   |   |   |-- database.js
|   |   |-- docker-compose.yml
```
## Step - 1 Jalankan Container MySQL di Local
1.

## Step - 2 Instalisasi Project
1. silahkan git clone https://github.com/jrarkaan/pharos-test/
2. selanjutnya buka terminal anda, dan masuk ke dalam folder pharos-test
3. jika sudah di dalam folder tersebut silahkan, 'npm install'
4. apabila sudah selesai menginstall node packages, maka selanjutnya adalah copy file config.example.dev.js dan rename menjadi config.js
5. tahap terakhir jalankan 'npm run dev'
      
