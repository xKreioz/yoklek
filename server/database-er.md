# YOKLEK — Database ER Diagram

ฐานข้อมูล MongoDB (Mongoose) — 6 collections

```mermaid
erDiagram
    USER ||--o{ WORKOUTLOG : "logs"
    USER ||--o{ VERIFICATIONSUBMISSION : "submits"
    USER ||--o{ EXPERTAPPLICATION : "applies"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ USER_BADGE : "earns"
    USER ||--o{ USER_GOAL : "sets"
    USER ||--o{ TRUSTED_DEVICE : "remembers"

    EXERCISE ||--o{ VERIFICATIONSUBMISSION : "verified by"
    EXERCISE ||--o{ USER_BADGE : "awarded for"
    EXERCISE ||--o{ USER_GOAL : "target of"
    EXERCISE ||--o{ WORKOUT_ENTRY : "performed in"

    WORKOUTLOG ||--|{ WORKOUT_ENTRY : "contains"
    WORKOUT_ENTRY ||--|{ WORKOUT_SET : "has"

    USER {
        ObjectId _id PK
        string email UK "required, lowercase"
        string password "required, bcrypt hash"
        string username
        string firstName "required"
        string lastName "required"
        date birthDate
        string gender "male|female|other"
        number weight
        number height
        string role "user|expert|admin"
        int goalDays "default 0"
        string resetToken
        date resetTokenExpiry
        string otpHash "2FA"
        date otpExpiry
        int otpAttempts "default 0"
        date createdAt
        date updatedAt
    }

    TRUSTED_DEVICE {
        string tokenHash "sha256"
        date expiresAt "30 days"
    }

    USER_BADGE {
        ObjectId exerciseId FK
        date earnedAt "default now"
    }

    USER_GOAL {
        ObjectId exerciseId FK
        number goalWeight
    }

    EXERCISE {
        ObjectId _id PK
        string name "required"
        string nameEn
        string[] muscleGroup "Arm|Chest|Leg|Back|Shoulder"
        string difficulty "beginner|intermediate|advanced"
        string description
        string[] steps
        string[] warnings
        string imageUrl
        string youtubeVideoId
        boolean verified "default false"
        ObjectId createdBy FK
        date createdAt
        date updatedAt
    }

    WORKOUTLOG {
        ObjectId _id PK
        ObjectId userId FK "required"
        date date "required"
        date createdAt
        date updatedAt
    }

    WORKOUT_ENTRY {
        ObjectId exerciseId FK
        string exerciseName "required"
        number goal "default 0"
    }

    WORKOUT_SET {
        number reps
        number weight
    }

    VERIFICATIONSUBMISSION {
        ObjectId _id PK
        ObjectId userId FK "required"
        ObjectId exerciseId FK "required"
        string videoUrl "required"
        string note
        string status "pending|approved|rejected"
        ObjectId reviewedBy FK
        string feedback
        date reviewedAt
        date createdAt
        date updatedAt
    }

    EXPERTAPPLICATION {
        ObjectId _id PK
        ObjectId userId FK "required"
        string videoUrl
        object[] links "label + url"
        string[] certImageUrls
        string experience "required"
        string certifications
        string status "pending|approved|rejected"
        ObjectId reviewedBy FK
        string reviewNote
        date createdAt
        date updatedAt
    }

    NOTIFICATION {
        ObjectId _id PK
        ObjectId userId FK "required, indexed"
        string type "welcome|verify_*|expert_*|streak_*|daily_motivation"
        string title "required"
        string message "required"
        boolean read "default false"
        date createdAt
        date updatedAt
    }
```

## หมายเหตุโครงสร้าง

- **Embedded (ฝังในเอกสาร ไม่ใช่ collection แยก):**
  - `TRUSTED_DEVICE`, `USER_BADGE`, `USER_GOAL` → ฝังเป็น array ใน **USER**
  - `WORKOUT_ENTRY` → ฝังเป็น array `exercises[]` ใน **WORKOUTLOG**
  - `WORKOUT_SET` → ฝังเป็น array `sets[]` ใน WORKOUT_ENTRY (ซ้อน 2 ชั้น)

- **Collections จริงใน MongoDB มี 6 ตัว:** users, exercises, workoutlogs, verificationsubmissions, expertapplications, notifications

- **Reference (FK ข้าม collection):** `userId`, `exerciseId`, `reviewedBy`, `createdBy` เก็บเป็น ObjectId ใช้ `.populate()` ตอน query

- **Indexes:**
  - `User.email` (unique)
  - `Exercise` text index บน name/nameEn/description
  - `WorkoutLog` { userId, date desc }
  - `Notification.userId`
