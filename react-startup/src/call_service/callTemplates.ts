enum UserGenre {
    Music = 'musition',
    Video = 'videographer',
    Photo = 'Photagrapher',
  }

type ProfileContent = Content[]

type Content = {
    creator : User
    genre: UserGenre
}

type User = {
    userName : string
    password: string;
    genre: UserGenre
}

type Message = {
    sender : string
    reciver : string
    content : string
}