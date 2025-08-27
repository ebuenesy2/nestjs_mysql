# Proje

## İndir
```
npm run start
```

## Çalıştır
```
npm run start
```

## Çalıştır - Anlık Çalıştırma
```
npm run start:dev
```

# Mysql Url

## GET
```
{{url}}/users
```
```
{{url}}/users/find/2
```
```
{{url}}/users/search?keyword=User
```

## Post Ekle
```
{{url}}/users/add
```
```
{
    "name": "Adı",
    "surname":"surname",
    "email":"test@name.com"
}
```

## Post Güncelle
```
{{url}}/users/edit/1
```
```
{
    "name": "Adı",
    "surname":"güncellendi x"
}
```

## GET - Sil
```
{{url}}/users/delete/6
```