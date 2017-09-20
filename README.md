# Teamboard
The simplest visual collaboration platform for agile product teams, ux/ui designers, project leaders, marketers and creatives.

## Description

* Created a visual collaboration system for product teams, ux/ui designers, project leaders and marketers
* Created tools so that users can draw flow charts, upload reports, take webpage snapshots, draw visual
art, create sticky notes, write their thoughts through pen tool, rubber, brush and can also draw shapes.
* Used FabricJS canvas library, HTML, CSS, Javascript for frontend design, NodeJS for backend,
MongoDB for Database storage, and webpack for pre processing.
* Using NodeJS and Socket.io library, created a real time bi-directional system through which team
members can work on a single white board at the same time and all changes on board will be reflected
every connected members in real time. Users can also chat with other members privately or in group.

## How To Run

* Clone the repo
* Open terminal and type `npm install`
* Type `bower install`
* After that type `npm run dev`

> If something is left create an issue ticket. I will add in instructions

## Project Setup

* Webpack is used from various preprocessing like sass to cass, minification, combining all JS into one file.
* All frontend part is written in public/src which then compiles down to public/dist.
* Browser sync is used to watch over files.
* Using concurrent to run various node scripts together.
* Bower is used from getting frontend dependencies.

## Features

#### Uploading

* Image upload on visual board
* Image upload from URL
* Webpage screenshot uploading

#### Shapes

* Line
* Square
* Rectangle
* Rounded Rectagle
* Diamond
* Triangle
* Pentagon
* Parallelogram
* Star

#### Tools

* Pencil Tool
* Text Tool
* Sticky Note
* Hand tool

#### Others

* Undo
* Redo
* Delete
* Share board with any registered user by entering their email

#### Window

* Property Window - This window lists all the properties of the object. You can choose any object like shape, pencil, line etc and change change its properties (width, height, color, back color, forground color, border, shading etc) through this property window. It acts just like property window we have in visual studio GUI or netbeans/Eclipse GUI

* Change Window - This window allows you to send messages to all connected peers/nodes. 

## Background process

Everything you do on the whiteboard is saved in MongoDB database. Localstorage is used to keep data in memory for fast retrievals. Socket.io library is used to create chat rooms, and node connections for all whiteboards.
Backend is written in nodeJS, frontend tech uses Jquery, fabric js as canvas library

### Requirements

* All you need is mongodb and NodeJS, NPM, webpack and bower installed