# Socket Testing Server

```bash
npm ci
npm start
```

## Events

- `pub` : send message to client
- `sub` : receive message from client

### Pub

```ts
/** @description client side */

socket.on('welcome', () => {
  console.log('welcome');
});
```

### Sub

```ts
/** @description client side */

socket.emit('hi');
socket.emit('hello');
```
