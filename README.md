## Pharos Test Backend 1 (BE-1)
Perkenalkan nama saya Raka Janitra Arkaan saya seorang Backend Engineer, dan tidak menutup kemungkinan bisa sebagai Full-Stack Engineer. 
Untuk informasi lebih lanjut tentang saya dapat kunjungi:
1. Linkedin: https://www.linkedin.com/in/rakajanitraa/
2. Instagram: https://www.instagram.com/rakajanitraa/

## Penjelasan Projek
1. Framework, bahasa pemrograman, database yang digunakan -> https://drive.google.com/file/d/14UdCohR_hLa3qL8t93ybPnNrVKgqO1H8/view
2. api/task/add -> https://drive.google.com/file/d/1rUqO6NRHLKxFOux5aVU1A6CxcfLQ5avL/view
3. api/task/get/:id && api/task/update/:id -> https://drive.google.com/file/d/1OZAvP1wMdf-SH-TfP5bpQkls0mbwUG9F/view
4. api/task/get && api/task/delete/:id -> https://drive.google.com/file/d/1OZAvP1wMdf-SH-TfP5bpQkls0mbwUG9F/view

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
|   |   |   
|   |   |-- docker-compose.yml
```
## Step - 1 Jalankan Container MySQL di Local
Penjelasan menggunakan Video
https://drive.google.com/file/d/1JNTDFA0rQLG2nnPI2Rs2sntnedKX2nyI/view

## Step - 2 Instalisasi Project
- Penjelasan Services Backend Part 1 https://drive.google.com/file/d/1Czv_D1ph8dcRl-tnd9RCk9WO108ePqf6/view
- Penjelasan Services Backend Part 2 https://drive.google.com/file/d/1aPQNm94b9uLFl-cBbNi9tcnSrBUKi8Hq/view
- Penjelasan Services Backend Part 3 (end) https://drive.google.com/file/d/1xHE3ksG4JIW9CqgHiB73Rt5yVB2fMxsa/view

1. silahkan git clone https://github.com/jrarkaan/pharos-test/
2. selanjutnya buka terminal anda, dan masuk ke dalam folder pharos-test
3. jika sudah di dalam folder tersebut silahkan, 'npm install'
4. apabila sudah selesai menginstall node packages, maka selanjutnya adalah copy file config.example.dev.js dan rename menjadi config.js
5. tahap terakhir jalankan 'npm run dev'
      
