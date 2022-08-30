# Amplify commands


0. Check status

```bash
    amplify status
```

1. Delete api resource

```bash
    amplify update api
``` 

Seguir instrucciones CLI

2. Delete function

```bash
amplify remove function
```

Seguir instrucciones


3. Create function

```bash
amplify add function
```

4. Add api resource

```bash
amplify update api
```

5. Upload resources cloud

```bash
amplify push
```

# Functions

### Adding packages

1. Go to amplify/backend/function/NAME/src

```bash
npm install PACKAGE
```

# Testing

## Functions

1. On root amplify

```bash
amplify mock function NAME
```

2. Select src/event.json (here are the params needed to execute lambda if needed)

3. Run :)

## api

1. On root amplify

```bash
amplify mock api
```