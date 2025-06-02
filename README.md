# omnieye (ghostcam-finder)

**omnieye** is a lightweight web application designed to search for publicly accessible webcams and open IP camera streams across the globe. It passively indexes unsecured or default-password live feeds from a variety of known camera models and open endpoints, making it possible to view anonymous, real-time glimpses into environments around the world.

this tool is intended for educational, research, and observational purposes only.

---

## features

- search interface for filtering cameras by location, keyword, or device type  
- passive querying of known public and open endpoints  
- real-time streaming of camera feeds (MJPEG, RTSP to browser preview, where supported)  
- minimal, dark-styled UI designed for long-form observation  
- camera metadata (IP, location hint, model) when available  
- does **not** brute-force, break, or exploit — omnieye only lists streams that are *already* publicly viewable or indexed

---

## why omnieye?

the internet is filled with forgotten feeds — weather stations in antarctica, traffic cams in shanghai, baby monitors in kansas, abandoned retail surveillance in nowhere towns. omnieye lets you explore these signals in a calm, structured, and voyeuristically honest way. think of it as a passive lens into the strange, liminal corners of a hyperconnected world.

---

## intended audience

- osint researchers  
- artists, documentarians, and explorers  
- urban studies and digital geography nerds  
- privacy advocates and infosec learners  
- ghosts, watchers, network kids  

---

## installation

you can run omnieye locally or deploy it as a private web tool.

### clone the repo

```bash
git clone https://github.com/yourusername/omnieye.git
cd omnieye
````

### install dependencies

```bash
npm install
```

### start the development server

```bash
npm run dev
```

---

## deployment

to build for production:

```bash
npm run build
```

then deploy the contents of the `dist` or `build` folder to your hosting provider or private server.

---

## architecture

* frontend: vanilla js or your choice of lightweight framework
* backend: optional API integration with passive camera indexing sources (e.g. insecam, shodan API, or your own crawler)
* no user tracking, no analytics, no database by default
* extensible with minimal code

---

## legal notice

**omnieye** does not hack, exploit, or crack any devices. it merely surfaces and organizes data already made public through misconfiguration, indexing, or user-intended sharing. usage of this tool is at your own discretion. do not use it to surveil, harass, or exploit anyone. respect privacy and legality at all times. this project is provided for educational and research purposes only.

---

## license

MIT license

---

## credits

created by voidrane Splicer, also known as numbpilled who is a homeless programmer with schizoaffective disorder who currently steal camps/scavenges in the apathetic streets of charlotte, nc. consider donating to her via apple pay at (+1 828 266 8648) or through purchasing her templates/themes at https://ko-fi.com/numbpilled

built in the spirit of liminal cartography and digital transparency


---

## support this project

feel free to fork, share, or build upon this tool.
for updates or related projects, visit: \[your personal site, neocities, or blog]

```


