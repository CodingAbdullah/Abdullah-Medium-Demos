## Summary of Common Internet Protocols
The following table illustrates a summary of common internet protocols used in software development:

|  Protocol Name  |   OSI Model Layer  |   Relation   | Statefulness |            Port            | 
|:---------------:|:------------------:|:------------:|:------------:|:--------------------------:|
|    `HTTP/S`     |    Application     |   Internet   |   Stateless  | `80` → HTTP, `443` → HTTPS |
|    `FTP`        |    Application     |   Files      |   Stateful   |           `20/21`          |
|    `SMTP`       |    Application     |   Email      |   Stateless  |           `587`            |
|    `TCP`        |    Transport       |   Data       |   Stateful   |           `0-65535`        |
|    `UDP`        |    Transport       |   Data       |   Stateless  |           `N/A`            |
|    `SSH`        |    Application     |   Networking |   Stateful   |           `22`             |
|    `TLS/SSL`    |    Application     |   Security   |   Stateful   |           `N/A`            |