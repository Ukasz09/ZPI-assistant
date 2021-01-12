## ZPI Assistant - Frontend

### Prerequisites

First of all, make sure that you have installed NodeJs - if not, you can download it from here:
`https://nodejs.org/en/download/`

Then install required prerequisites on your development machine:

```bash
npm install --save
```

I case of running application on dev server make sure that you have installed AngularCLI:

```bash
npm install -g @angular/cli
```

### Running application (development server)

```bash
npm start
```

or

```bash
ng serve
```

This will start a dev server. After that navigate to page `http://localhost:4200/`

### Routes

---

- **Name:**
  confirmPassword
- **Route:**
  `/auth?email={email}&password={password}`
- **Type**
  GET
- **ResponseSchema:**
  `{ accountType: AccountTypes }`
- **ErrorSchema**
  ` { id: ErrorResponseType.INCORRECT_PASSWORD }` / `{ message: msg_text } `

---

- **Name:**
  getMessages
- **Type**
  GET
- **Route:**
  `/mailbox?email={email}`
- **ResponseSchema:**
  `Message[]`
- **ErrorSchema**
  `{ message: msg_text } `

---

- **Name:**
  markMessageAsReaded
- **Type**
  PUT
- **Route:**
  `/mailbox/markReaded?email={email}&messageId={messageId}`
- **ResponseSchema:**
  N/A
- **ErrorSchema**
  `{ message: msg_text } `

---

- **Name:**
  deleteMessage
- **Route:**
  `/mailbox?email={email}&messageId={messageId}`
- **Type**
  DELETE
- **ResponseSchema:**
  N/A
- **ErrorSchema**
  `{ message: msg_text } `

---

- **Name:**
  getStudents
- **Route:**
  `/students`
- **Type**
  GET
- **ResponseSchema:**
  StudentSchema[]
- **ErrorSchema**
  `{ message: msg_text } `

---

- **Name:**
  getStudent
- **Route:**
  `/students/{email}`
- **Type**
  GET
- **ResponseSchema:**
  StudentSchema
- **ErrorSchema**
  `{ message: msg_text } `

---

- **Name:**
  leaveTeam
- **Route:**
  `/students/leaveTeam?email={email}`
- **Type**
  PUT
- **ResponseSchema:**
  N/A
- **ErrorSchema**
  `{ message: msg_text } `

---

- **Name:**
  acceptInvitation
- **Route:**
  `/mailbox/accept?email={email}&messageId={messageId}`
- **Type**
  PUT
- **ResponseSchema:**
  `{ teamId: string }`
- **ErrorSchema**
  `{id : ErrorResponseType.ERR_STUDENT_HAVE_TEAM}` / `{ message : msg_text } `

---

- **Name:**
  getTeachers
- **Route:**
  `/teachers`
- **Type**
  GET
- **ResponseSchema:**
  `TeacherSchema[]`
- **ErrorSchema**
  `{ message : msg_text } `

---

- **Name:**
  getAllTeams
- **Route:**
  `/teams`
- **Type**
  GET
- **ResponseSchema:**
  `TeamSchema[]`
- **ErrorSchema**
  `{ message : msg_text } `

---

- **Name:**
  getTeam
- **Route:**
  `/teams/{id}`
- **Type**
  GET
- **ResponseSchema:**
  `TeamSchema`
- **ErrorSchema**
  `{ message : msg_text } `

---

- **Name:**
  createTeam
- **Route:**
  `/teams/{id}`
- **Type**
  POST
- **ResponseSchema:**
  `{ id: string }`
- **ErrorSchema**
  `{ id: ErrorResponseType.ERR_STUDENT_HAVE_TEAM, teamId: 'Z02', }`/ `{ message : msg_text } `

---

- **Name:**
  addTeamLecturer
- **Route:**
  `/teams/addLecturer?teamId={teamId}&email={email}`
- **Type**
  PUT
- **ResponseSchema:**
  N / A
- **ErrorSchema**
  `{ message : msg_text } `

---

- **Name:**
  leaveTeam
- **Route:**
  `/teams/leaveTeam?teamId={teamId}&email={email}`
- **Type**
  PUT
- **ResponseSchema:**
  N / A
- **ErrorSchema**
  `{ message : msg_text } `

---

- **Name:**
  removeTeam
- **Route:**
  `/teams/removeTeam?teamId={teamId}`
- **Type**
  DELETE
- **ResponseSchema:**
  N / A
- **ErrorSchema**
  `{ message : msg_text } `
