<font size="1">**PRAGYA — Within** </font>

**Understand the mind. Change the response.**

<p align="center">
  <strong>A space for self-awareness, reflection, and intentional growth.</strong>
</p>

<p align="center">
  <a href="https://pragya-within.vercel.app">Live Demo</a> ·
  <a href="https://github.com/GURUBAKSHYADAV-71218/Pragya">Source Code</a>
</p>

<font size="2">``Table of Contents``</font>

About PRAGYA

Who Is It For?

Features

How It Works

Screenshots

Technology Stack

Architecture

Project Structure

Data Storage and Accounts

Security and Privacy

Getting Started

Supabase Configuration

Testing and Quality Checks

Deployment

Engineering Decisions

Known Limitations

Future Improvements

Contributing

License


<font size="2">About PRAGYA</font>

``PRAGYA`` is a self-awareness and mind-training web application built around a simple idea: understanding our thoughts and responses is an important step toward making more intentional choices.

It brings structured practice, personal reflection, and learning experiences together in one application. Users can explore the available experiences as guests, while account-based functionality is available when Supabase is configured.

PRAGYA aims to make self-reflection an activity people can return to—not just information they read once and forget.

``The idea behind the name``

Prajñā (प्रज्ञा) is a Sanskrit word associated with wisdom, insight, discernment, and deeper understanding.

The product takes inspiration from that meaning: developing greater awareness of what happens within us and approaching our responses more thoughtfully.

**At a glance**

Attribute

Details

Product

PRAGYA

Category

Self-awareness and mind-training

Live application

pragya-within.vercel.app

Repository

GitHub

Framework

Next.js

Language

TypeScript

Styling

Tailwind CSS

Authentication and database

**Who Is It For?**

``For users``

PRAGYA is intended for people who want a dedicated space to explore self-awareness, reflect on their responses, and engage with learning and practice activities.

You can open the live application and explore its guest experience without setting up a development environment.

``For developers and recruiters``

PRAGYA is also a project demonstrating how a web application can organize content, support guest and account-based experiences, and separate data-access logic from the user interface.

The repository documents its architecture, environment configuration, testing commands, authentication setup, and database security checks.

**Features**

1. Practice and reflection

PRAGYA includes application routes for practice, reflection, and learning experiences.

The goal is to provide a structured environment for engaging with self-awareness concepts through activities rather than relying exclusively on passive reading.

2. Explore & Learn

The learning experience includes:

A learning board at /learn.

Individual guides at /learn/[slug].

Typed guide content maintained in lib/learn.ts.

Public, read-only access to learning content.

3. Guest-first experience

Users can access the guest experience without creating an account.

Guest data is stored in the current browser.

Guest use does not require Supabase account configuration.

Guest data is separate from account-associated data.

Guest data can remain available on the same browser according to the application's storage behaviour.

Guest data should not be assumed to sync across browsers or devices.

4. Account-based functionality

When valid Supabase configuration is provided, the application supports account authentication through Supabase Auth.

The account experience is designed to associate user data with the signed-in account rather than treating it as guest data.

5. Guest-data import

The Settings experience offers a one-time, additive import of guest data into an account.

This provides a path for moving from guest use to account-based use. Users should review the resulting data and understand that guest and account data are distinct.

6. Flexible data access

The repository layer in lib/repository.ts provides an interface for local and Supabase-backed storage.

This separates data-access operations from the rest of the application and gives the codebase a clearer place to manage storage behaviour.

Feature availability depends on the application's configuration. Account-related functionality requires valid Supabase environment variables and appropriate database setup.


How It Works

At a high level, PRAGYA has three important parts:

1. The application interface

Next.js routes provide the pages and user-facing experiences for practice, reflection, and learning.

2. Content and application logic

Typed learning guides and application content are maintained in dedicated modules, rather than being mixed entirely into page components.

3. The data-access layer

The repository interface separates storage operations from the UI. Depending on the configured experience, data may be stored in the browser or associated with a Supabase account.

Conceptual user flow


```text
Open PRAGYA
    |
    v
Explore the application
    |
    +---------------------------+

    |                           |
    v                           v
Continue as guest          Sign in / Sign up

    |                           |
    v                           v
Browser-local data          Supabase Auth
                                |
                                v
                         Account-associated data
```

### Technology Stack

| Technology | Role in the project |
| :--- | :--- |
| **Next.js** | Application framework, routing, and production build |
| **React** | Component-based interface |
| **TypeScript** | Type checking and clearer data contracts |
| **Tailwind CSS** | Utility-first styling |
| **Supabase Auth** | Account authentication |
| **Supabase database** | Account-associated data storage |
| **Browser storage** | Guest-mode persistence |
| **Node.js test runner** | Automated unit tests |
| **Vercel** | Hosting and deployment |

The framework and libraries provide the foundation; the application's own code defines the actual product behaviour.

Architecture

PRAGYA separates routes, content, and storage responsibilities.

1. Application routes

The app/ directory contains the Next.js App Router structure.

The app/(app)/ route group contains the shared application experience, including practice, reflection, and learning routes.

2. Content modules

lib/content.ts contains exercises, experiments, and wisdom-related content.

lib/learn.ts contains typed learning-guide content.

Keeping content in dedicated modules makes it easier to maintain and extend without placing all content directly inside UI components.

3. Repository interface

lib/repository.ts provides the storage interface used to separate data-access operations from the UI.

This abstraction helps organize the local and Supabase-backed experiences. It does not, by itself, guarantee that every storage operation has identical behaviour or that data is synchronized between them.

4. Supabase database and access policies

The supabase/ directory contains database setup and security-check SQL files.

```text
Architecture overview

                 PRAGYA
                    |
          +---------+---------+

          |                   |
          v                   v
    Next.js routes       Shared UI

          |                   |
          +---------+---------+
                    |
                    v
         Content and app logic

          |                   |
          v                   v
     lib/content.ts      lib/learn.ts
                    |
                    v
           Repository interface
          lib/repository.ts
                    |
             +------+------+

             |             |
             v             v
       Local storage   Supabase-backed
       guest data      account data

This diagram represents the documented architectural responsibilities. Exact function calls, component boundaries, and data transformations should be verified against the source code.
```

### Project Structure

```text
Pragya/
├── app/
│   └── (app)/
│       └── learn/
│           └── [slug]/
├── lib/
│   ├── content.ts
│   ├── learn.ts
│   └── repository.ts
├── supabase/
│   ├── schema.sql
│   └── rls-check.sql
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

The tree highlights important paths documented for the project. It is intentionally not an exhaustive file listing; consult the repository for the complete structure.


schema.sql defines the database setup and policies.

rls-check.sql supports checks of Row Level Security behaviour.

The policies must be reviewed and tested against the actual schema and application queries.

### Important files

| Path | Responsibility |
| :--- | :--- |
| `app/(app)/` | Shared application routes and experiences |
| `app/(app)/learn/` | Learning board and guide routes |
| `lib/content.ts` | Exercise and application content |
| `lib/learn.ts` | Typed learning-guide content |
| `lib/repository.ts` | Storage interface |
| `supabase/schema.sql` | Database schema and policy setup |
| `supabase/rls-check.sql` | SQL checks for data-access policies |
| `.env.example` | Environment-variable template |

---

### Data Storage and Accounts

PRAGYA distinguishes guest use from account-based use.

| Area | Guest experience | Account experience |
| :--- | :--- | :--- |
| **Authentication** | Not required | Supabase Auth |
| **Storage** | Current browser | Supabase-backed account data |
| **Cross-device synchronization** | Not implied | Depends on implemented account-data flows |
| **Guest-data import** | Not applicable | Available through Settings |
| **Configuration** | No Supabase variables required for guest use | Supabase variables and database setup required |

