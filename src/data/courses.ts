import introImage from "../assets/introductiontocybersecurity.jpg";
import webAppImage from "../assets/webapplicationsecurity.jpg";
import networkImage from "../assets/networkpenetrationtesting.jpg";
import malwareImage from "../assets/malwareanalysis.jpg";
import cloudImage from "../assets/cloudsecurityfundamentals.jpg";
import advancedImage from "../assets/advancedethicalhacking.jpg";

export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer (0-based)
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Course {
  id: number;
  courseId: string;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  price: string;
  category: string;
  chapters: Chapter[];
  quiz: Quiz;
}

export const courses: Course[] = [
  {
    id: 1,
    courseId: "intro-cybersecurity",
    title: "Introduction to Cyber Security",
    description: "This foundational course introduces the core concepts, principles, and practices of cybersecurity, providing a broad overview of the field and its importance in today's digital world.",
    image: introImage,
    level: "Beginner",
    duration: "8h",
    price: "Free",
    category: "Free",
    chapters: [
      {
        id: "chapter-1",
        title: "Foundations of Cybersecurity",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Defining Cybersecurity: A historical overview and modern context.",
            content: "This lesson provides the foundational understanding of what cybersecurity is and why it's a critical discipline. Students will learn the evolution of the field from its early days of securing military and government networks to its modern role in protecting personal data, corporate infrastructure, and critical national infrastructure. The course will define key terms like cybercrime, cyberterrorism, and cyberwarfare, and discuss the ever-changing threat landscape. The goal is to establish a strong conceptual framework for the rest of the curriculum."
          },
          {
            id: "lesson-1-2",
            title: "The CIA Triad: Confidentiality, Integrity, and Availability.",
            content: "The CIA Triad is the cornerstone of information security. This lesson breaks down each component: Confidentiality (preventing unauthorized disclosure of data), Integrity (ensuring data is not altered in an unauthorized manner), and Availability (guaranteeing systems and data are accessible when needed). Students will explore real-world scenarios to understand how a breach in any one of these three pillars can have significant consequences."
          },
          {
            id: "lesson-1-3",
            title: "Threat Actors and Attack Vectors: Understanding who the adversaries are and how they operate.",
            content: "This lesson moves from theoretical concepts to practical threats. It categorizes different types of threat actors, from script kiddies and hacktivists to organized crime syndicates and nation-state attackers. For each type of actor, the lesson details their motivations, resources, and common attack vectors, such as phishing, malware, denial-of-service, and zero-day exploits."
          },
          {
            id: "lesson-1-4",
            title: "The Kill Chain and ATT&CK Frameworks: Analyzing the stages of a cyber attack.",
            content: "This lesson introduces two critical frameworks for understanding and defending against cyberattacks. The Cyber Kill Chain provides a structured, phased approach to understanding how a cyberattack unfolds, from reconnaissance to exfiltration. The MITRE ATT&CK framework offers a detailed, knowledge-based resource of adversary tactics and techniques, helping students to model threats and plan defenses more effectively."
          },
          {
            id: "lesson-1-5",
            title: "Legal and Ethical Considerations in Cybersecurity.",
            content: "Cybersecurity is not just about technology; it's about people and their responsibilities. This lesson explores the legal landscape, including data privacy laws like GDPR and CCPA, as well as the ethical dilemmas faced by security professionals. Topics include responsible disclosure, data handling, and the fine line between ethical hacking and illegal activity."
          }
        ]
      },
      {
        id: "chapter-2",
        title: "Security Controls and Best Practices",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Types of Security Controls: Administrative, Technical, and Physical.",
            content: "This lesson provides a taxonomy of security controls. Administrative controls are policies and procedures (e.g., security awareness training). Technical controls are hardware and software-based (e.g., firewalls, access control lists). Physical controls are tangible measures (e.g., locks, cameras). Students will learn how these three types of controls work together to form a layered defense strategy."
          },
          {
            id: "lesson-2-2",
            title: "Cryptography Fundamentals: Symmetric, Asymmetric, and Hashing.",
            content: "This lesson demystifies the science of cryptography, which is essential for data protection. It explains the difference between symmetric encryption (using a single key), asymmetric encryption encryption (using a public and private key pair), and hashing (creating a unique, fixed-size string from data). Students will understand how these concepts are applied in everyday technologies like HTTPS and digital signatures."
          },
          {
            id: "lesson-2-3",
            title: "Network Security Basics: Firewalls, IDS/IPS, and VPNs.",
            content: "This lesson focuses on the defensive measures used to secure computer networks. It explains the function of firewalls in filtering network traffic, Intrusion Detection Systems (IDS) in monitoring for malicious activity, and Intrusion Prevention Systems (IPS) in actively blocking threats. The role of Virtual Private Networks (VPNs) in creating secure, encrypted connections over public networks is also covered."
          },
          {
            id: "lesson-2-4",
            title: "Endpoint Security: Antivirus, EDR, and Host-based firewalls.",
            content: "While network security is important, a significant amount of attacks target individual devices. This lesson covers the security of endpoints like computers and mobile devices. Students will learn about traditional antivirus software, as well as more modern Endpoint Detection and Response (EDR) solutions that use behavioral analysis to spot and stop sophisticated threats."
          },
          {
            id: "lesson-2-5",
            title: "Physical Security Measures.",
            content: "This lesson highlights a frequently overlooked aspect of security: the physical environment. It covers the importance of physical access controls, such as locks and biometric scanners, as well as surveillance and environmental controls. The lesson emphasizes that a strong cyber defense is useless if an attacker can simply walk in and plug a device into a server."
          }
        ]
      },
      {
        id: "chapter-3",
        title: "Risk Management and Incident Response",
        lessons: [
          {
            id: "lesson-3-1",
            title: "Introduction to Risk Management: Identification, Assessment, and Mitigation.",
            content: "This lesson introduces the systematic process of managing cybersecurity risks. Students will learn how to identify potential threats and vulnerabilities, assess their likelihood and impact, and then develop strategies to mitigate, transfer, avoid, or accept those risks."
          },
          {
            id: "lesson-3-2",
            title: "Business Continuity and Disaster Recovery Planning.",
            content: "In the event of a major security incident, it is crucial to have a plan to get operations back on track. This lesson covers the creation of Business Continuity Plans (BCP) to ensure essential functions continue during a crisis, and Disaster Recovery (DR) plans for restoring IT infrastructure and data after a catastrophic event."
          },
          {
            id: "lesson-3-3",
            title: "The Incident Response Lifecycle: Preparation, Detection, Containment, Eradication, Recovery, and Post-Incident Activity.",
            content: "This lesson provides a structured, six-phase approach to handling security incidents. It covers everything from preparing for an attack and detecting it, to containing the damage, eradicating the threat, recovering affected systems, and analyzing what went wrong to prevent future occurrences."
          },
          {
            id: "lesson-3-4",
            title: "Digital Forensics Fundamentals: The process of collecting and analyzing evidence.",
            content: "When a security incident occurs, a forensic analysis is needed to understand the 'what, when, and how.' This lesson introduces the principles of digital forensics, including the proper procedures for collecting and preserving digital evidence, analyzing system logs and disk images, and presenting findings in a legal or corporate setting."
          },
          {
            id: "lesson-3-5",
            title: "Tools of the Trade: Shell and Nmap",
            content: "This lesson introduces two essential tools for a security professional. The shell (command-line interface) is the primary way to interact with an operating system and is used for automation, scripting, and executing various security tools. Nmap (Network Mapper) is a powerful, open-source tool used for network discovery and security auditing. It can identify hosts, services, and open ports on a network, which is a critical first step in any security assessment."
          }
        ]
      }
    ],
    quiz: {
      id: "intro-cybersecurity-quiz",
      title: "Introduction to Cyber Security Quiz",
      questions: [
        {
          id: "q1",
          question: "Which of the following is not a component of the CIA Triad?",
          options: ["Confidentiality", "Compliance", "Integrity", "Availability"],
          correctAnswer: 1,
          explanation: "The CIA Triad consists of Confidentiality, Integrity, and Availability. Compliance is not part of the CIA Triad."
        },
        {
          id: "q2",
          question: "A security measure that involves a written policy or procedure is an example of what type of control?",
          options: ["Technical", "Administrative", "Physical", "Detective"],
          correctAnswer: 1,
          explanation: "Administrative controls are policies and procedures, such as security awareness training and written policies."
        },
        {
          id: "q3",
          question: "What is the main goal of a Business Continuity Plan (BCP)?",
          options: [
            "To restore IT infrastructure to a working state.",
            "To identify and mitigate cybersecurity risks.",
            "To ensure essential business functions continue during and after a crisis.",
            "To analyze the root cause of a security incident."
          ],
          correctAnswer: 2,
          explanation: "A BCP ensures that essential business functions can continue during and after a crisis or disaster."
        },
        {
          id: "q4",
          question: "Which of the following best describes the function of an Intrusion Prevention System (IPS)?",
          options: [
            "It monitors network traffic for malicious activity without taking action.",
            "It filters network traffic based on predefined rules.",
            "It actively blocks malicious network traffic to prevent an attack.",
            "It is a tool used for packet sniffing and analysis."
          ],
          correctAnswer: 2,
          explanation: "An IPS actively blocks malicious network traffic to prevent attacks, unlike an IDS which only monitors and alerts."
        },
        {
          id: "q5",
          question: "What is the process of generating a fixed-size string from data, which cannot be reversed to get the original data?",
          options: ["Symmetric Encryption", "Asymmetric Encryption", "Hashing", "Public Key Infrastructure"],
          correctAnswer: 2,
          explanation: "Hashing creates a unique, fixed-size string from data that cannot be reversed to get the original data."
        }
      ]
    }
  },
  {
    id: 2,
    courseId: "web-application-security",
    title: "Web Application Security",
    description: "This course focuses on the vulnerabilities and threats specific to web applications, teaching students how to identify, exploit, and remediate common security flaws.",
    image: webAppImage,
    level: "Intermediate",
    duration: "12h",
    price: "$29",
    category: "Premium",
    chapters: [
      {
        id: "chapter-1",
        title: "Understanding Web Application Vulnerabilities",
        lessons: [
          {
            id: "lesson-1-1",
            title: "The OWASP Top 10: A deep dive into the most critical web application security risks.",
            content: "This lesson focuses on the OWASP Top 10, a widely recognized list of the most dangerous web application security risks. Students will gain a deep understanding of each category, including Injection, Broken Authentication, Sensitive Data Exposure, and Security Misconfiguration, and learn to recognize these vulnerabilities in source code and live applications."
          },
          {
            id: "lesson-1-2",
            title: "Injection Attacks: SQL Injection, Command Injection, and NoSQL Injection.",
            content: "Injection is a class of vulnerability where an attacker sends data to an application that tricks it into executing an unintended command. This lesson provides hands-on practice with SQL Injection to manipulate databases, Command Injection to execute system commands, and NoSQL Injection to exploit modern NoSQL databases."
          },
          {
            id: "lesson-1-3",
            title: "Cross-Site Scripting (XSS): Reflected, Stored, and DOM-based.",
            content: "XSS attacks allow an attacker to inject malicious scripts into web pages viewed by other users. This lesson differentiates between the three main types of XSS and provides practical labs for each, demonstrating how they can be used to steal session cookies, deface websites, and perform other malicious actions."
          },
          {
            id: "lesson-1-4",
            title: "Broken Authentication and Session Management.",
            content: "Weaknesses in how a web application handles user logins and sessions can be a major security risk. This lesson covers how to exploit and defend against vulnerabilities like credential stuffing, weak password policies, and insecure session token management."
          },
          {
            id: "lesson-1-5",
            title: "Security Misconfigurations and Sensitive Data Exposure.",
            content: "This lesson focuses on the human element of web security. Students will learn how simple misconfigurations, such as leaving default credentials, exposing sensitive directories, or using outdated software, can lead to devastating breaches. The lesson also covers how to identify and prevent the accidental exposure of sensitive data like personal information and API keys."
          }
        ]
      },
      {
        id: "chapter-2",
        title: "Attacking and Defending Web Applications",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Reconnaissance and Enumeration: Footprinting a web application.",
            content: "Before an attack, an ethical hacker must perform thorough reconnaissance. This lesson teaches various techniques to gather information about a target web application, including using search engines, domain lookups, and tools to discover subdomains, directories, and hidden files."
          },
          {
            id: "lesson-2-2",
            title: "Manual vs. Automated Testing: Using tools like Burp Suite and OWASP ZAP.",
            content: "This lesson introduces the essential tools of a web application security professional. Students will learn how to use automated scanners like OWASP ZAP to quickly identify common vulnerabilities and will gain expertise in manual testing using a proxy tool like Burp Suite to intercept, analyze, and manipulate HTTP traffic."
          },
          {
            id: "lesson-2-3",
            title: "Exploitation Techniques: Practical labs for exploiting common vulnerabilities.",
            content: "This is a hands-on lesson where students will apply the knowledge from previous lessons to exploit known vulnerabilities in a safe, controlled lab environment. The focus is on practical application and understanding the full attack lifecycle from discovery to exploitation."
          },
          {
            id: "lesson-2-4",
            title: "Secure Coding Practices: How to prevent vulnerabilities at the development stage.",
            content: "The best defense is to build secure applications from the ground up. This lesson shifts the focus from attacking to defending, providing developers with best practices for writing secure code. Topics include using input sanitization, output encoding, and strong cryptographic functions."
          },
          {
            id: "lesson-2-5",
            title: "Input Validation, Output Encoding, and Parameterized Queries.",
            content: "This lesson provides a deeper dive into the technical controls that prevent common vulnerabilities. Students will learn the difference between input validation (ensuring data is of the correct type and format), output encoding (rendering data safely to prevent XSS), and parameterized queries (a key defense against SQL Injection)."
          }
        ]
      },
      {
        id: "chapter-3",
        title: "Advanced Topics and Protection",
        lessons: [
          {
            id: "lesson-3-1",
            title: "API Security: Understanding vulnerabilities in modern APIs.",
            content: "With the rise of single-page applications and microservices, API security is more important than ever. This lesson covers the unique threats to APIs, including broken object-level authorization, excessive data exposure, and lack of resource and rate limiting."
          },
          {
            id: "lesson-3-2",
            title: "Web Application Firewalls (WAFs): How they work and how to bypass them.",
            content: "A WAF is a powerful security tool designed to protect web applications from common attacks. This lesson explains how WAFs inspect and filter HTTP traffic, but also demonstrates how a skilled attacker can craft requests to evade a WAF's detection rules."
          },
          {
            id: "lesson-3-3",
            title: "Content Security Policy (CSP) and HTTP Security Headers.",
            content: "This lesson teaches defensive techniques that can be implemented at the server level. Students will learn how to use a Content Security Policy (CSP) to restrict the sources of scripts, styles, and other content, as well as other HTTP headers like Strict-Transport-Security to enhance a web application's security posture."
          },
          {
            id: "lesson-3-4",
            title: "Server-Side Request Forgery (SSRF) and Cross-Site Request Forgery (CSRF).",
            content: "This lesson covers two advanced, but common, web vulnerabilities. SSRF allows an attacker to make a server-side request on behalf of the victim, while CSRF tricks a victim into performing an unwanted action on a trusted site. Students will learn the mechanisms behind both attacks and how to implement effective countermeasures."
          },
          {
            id: "lesson-3-5",
            title: "Tools of the Trade: Burp Suite and OWASP ZAP",
            content: "This lesson focuses on two of the most popular web application security testing tools. Burp Suite is a comprehensive, professional-grade proxy tool that allows you to intercept, inspect, and modify traffic between your browser and a web server. OWASP ZAP (Zed Attack Proxy) is a free, open-source tool used for finding vulnerabilities in web applications. It can be used for both automated scanning and manual penetration testing."
          }
        ]
      }
    ],
    quiz: {
      id: "web-app-security-quiz",
      title: "Web Application Security Quiz",
      questions: [
        {
          id: "q1",
          question: "What does the OWASP Top 10 list represent?",
          options: [
            "The 10 most common types of malware.",
            "The 10 most critical security risks to web applications.",
            "The 10 most popular web application security tools.",
            "The 10 most critical security standards for data centers."
          ],
          correctAnswer: 1,
          explanation: "The OWASP Top 10 is a list of the most critical security risks to web applications."
        },
        {
          id: "q2",
          question: "Which of the following is the best defense against a SQL Injection attack?",
          options: ["Input Validation", "Using a Web Application Firewall (WAF)", "Output Encoding", "Parameterized Queries"],
          correctAnswer: 3,
          explanation: "Parameterized queries are the most effective defense against SQL injection attacks."
        },
        {
          id: "q3",
          question: "What type of XSS attack is delivered through a link in a phishing email?",
          options: ["Reflected XSS", "Stored XSS", "DOM-based XSS", "Persistent XSS"],
          correctAnswer: 0,
          explanation: "Reflected XSS attacks are typically delivered through malicious links in emails or other communications."
        },
        {
          id: "q4",
          question: "Which of these is a popular, open-source proxy tool used for manual web application security testing?",
          options: ["Nmap", "Burp Suite", "Metasploit", "Ghidra"],
          correctAnswer: 1,
          explanation: "Burp Suite is a comprehensive proxy tool used for web application security testing."
        },
        {
          id: "q5",
          question: "What vulnerability allows an attacker to trick a trusted application into performing an unintended request on their behalf?",
          options: [
            "Server-Side Request Forgery (SSRF)",
            "Cross-Site Request Forgery (CSRF)",
            "Cross-Site Scripting (XSS)",
            "Broken Authentication"
          ],
          correctAnswer: 1,
          explanation: "CSRF tricks a victim into performing an unwanted action on a trusted site."
        }
      ]
    }
  },
  {
    id: 3,
    courseId: "network-penetration-testing",
    title: "Network Penetration Testing",
    description: "This course provides a hands-on approach to network security, teaching the methodology and tools used to assess the security of computer networks and connected systems.",
    image: networkImage,
    level: "Advanced",
    duration: "15h",
    price: "$39",
    category: "Premium",
    chapters: [
      {
        id: "chapter-1",
        title: "The Penetration Testing Lifecycle",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Scoping and Reconnaissance: Defining the engagement and gathering initial information.",
            content: "The first phase of any ethical hacking engagement is to define the rules of engagement and gather as much information as possible about the target network. This lesson covers passive reconnaissance using open-source intelligence (OSINT) and active reconnaissance techniques like DNS lookups and ping sweeps."
          },
          {
            id: "lesson-1-2",
            title: "Scanning and Enumeration: Port scanning, service enumeration, and network mapping.",
            content: "With a clear scope and initial information, the next step is to scan the network for open ports and services. This lesson teaches the use of powerful scanning tools like Nmap to identify active hosts, open ports, and the versions of services running on them, which is crucial for identifying potential attack vectors."
          },
          {
            id: "lesson-1-3",
            title: "Vulnerability Analysis: Identifying potential weaknesses and misconfigurations.",
            content: "Once services and ports are identified, this lesson focuses on finding exploitable vulnerabilities. Students will learn to use vulnerability scanners like Nessus or OpenVAS to automate the process and will also learn how to manually check for common misconfigurations and out-of-date software."
          },
          {
            id: "lesson-1-4",
            title: "Gaining Access and Exploitation: Leveraging discovered vulnerabilities.",
            content: "This is the phase where the fun begins. Students will learn how to exploit the vulnerabilities discovered in the previous phase to gain unauthorized access to a system. This includes using pre-built exploits from frameworks like Metasploit and crafting custom payloads."
          },
          {
            id: "lesson-1-5",
            title: "Post-Exploitation and Reporting.",
            content: "After gaining access, an ethical hacker's job is not over. This lesson covers post-exploitation activities like privilege escalation, lateral movement, and data exfiltration. The final, and most critical, part of this lesson is learning how to write a clear, concise, and actionable report for the client, detailing the vulnerabilities found and the steps to fix them."
          }
        ]
      },
      {
        id: "chapter-2",
        title: "Tools and Techniques",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Introduction to Kali Linux and its core tools.",
            content: "Kali Linux is the de facto operating system for penetration testers. This lesson provides a hands-on tour of the Kali environment, introducing its pre-installed suite of security tools and teaching students how to navigate the file system and use the command line effectively."
          },
          {
            id: "lesson-2-2",
            title: "Network Scanning with Nmap: Advanced techniques and scripting.",
            content: "This lesson goes beyond basic port scanning with Nmap. Students will learn advanced techniques like stealth scans, version detection, OS fingerprinting, and how to use the Nmap Scripting Engine (NSE) to automate vulnerability checks and other tasks."
          },
          {
            id: "lesson-2-3",
            title: "Exploitation with Metasploit Framework.",
            content: "The Metasploit Framework is one of the most powerful and widely used exploitation tools. This lesson teaches students how to use Metasploit to find and execute exploits against a variety of targets, manage sessions, and perform post-exploitation tasks."
          },
          {
            id: "lesson-2-4",
            title: "Password Attacks: Cracking hashes and brute-force techniques.",
            content: "Passwords are often the weakest link in a network's security. This lesson covers how to obtain password hashes from compromised systems and then use tools like John the Ripper and Hashcat to crack them using dictionary attacks and brute-force methods."
          },
          {
            id: "lesson-2-5",
            title: "Social Engineering and Phishing.",
            content: "The most common attack vector is the human being. This lesson covers the art and science of social engineering, including how to craft persuasive phishing emails, create fake login pages, and use pretexts to manipulate individuals into revealing sensitive information."
          }
        ]
      },
      {
        id: "chapter-3",
        title: "Advanced Network Attacks",
        lessons: [
          {
            id: "lesson-3-1",
            title: "Man-in-the-Middle (MITM) Attacks and Packet Sniffing.",
            content: "In a Man-in-the-Middle (MITM) attack, an attacker places themselves between a victim and a server to intercept and manipulate traffic. This lesson teaches how to perform MITM attacks on a network and use tools like Wireshark to sniff and analyze network packets for unencrypted credentials and other sensitive data."
          },
          {
            id: "lesson-3-2",
            title: "Wireless Network Hacking: Cracking WEP, WPA, and WPA2.",
            content: "This lesson focuses on the unique challenges of securing wireless networks. Students will learn the vulnerabilities of older protocols like WEP and WPA and how to perform attacks against the more secure WPA2 protocol using tools like Aircrack-ng to capture and crack the handshake."
          },
          {
            id: "lesson-3-3",
            title: "Bypassing Firewalls and Intrusion Detection Systems (IDS).",
            content: "Security devices are designed to stop attackers, but a skilled attacker knows how to get around them. This lesson covers techniques to bypass firewalls using tunneling and port forwarding and how to evade detection by IDS/IPS using fragmentation, obfuscation, and other methods."
          },
          {
            id: "lesson-3-4",
            title: "Pivoting and Lateral Movement within a network.",
            content: "Once a single machine is compromised, an attacker can use it as a foothold to move deeper into the network. This lesson teaches the tactics of pivoting and lateral movement to compromise other machines and reach high-value targets."
          },
          {
            id: "lesson-3-5",
            title: "Denial of Service (DoS) and Distributed Denial of Service (DDoS) attacks.",
            content: "This lesson covers the attacks that aim to make a service unavailable by overwhelming it with traffic. Students will learn the different types of DoS attacks and the more powerful, distributed versions (DDoS), as well as the defensive measures used to mitigate them."
          },
          {
            id: "lesson-3-6",
            title: "Tools of the Trade: Nmap, Metasploit, and Wireshark",
            content: "This lesson provides an overview of three cornerstone tools for network penetration testing. Nmap (Network Mapper) is used for discovering hosts and services on a network. The Metasploit Framework is a powerful platform for developing, testing, and executing exploits. Wireshark is a network protocol analyzer that lets you capture and interactively browse the traffic running on a computer network."
          }
        ]
      }
    ],
    quiz: {
      id: "network-pentest-quiz",
      title: "Network Penetration Testing Quiz",
      questions: [
        {
          id: "q1",
          question: "Which of the following is the most widely used operating system for penetration testing?",
          options: ["Ubuntu", "Windows", "macOS", "Kali Linux"],
          correctAnswer: 3,
          explanation: "Kali Linux is the de facto operating system for penetration testers with pre-installed security tools."
        },
        {
          id: "q2",
          question: "In the penetration testing lifecycle, what is the primary goal of the 'enumeration' phase?",
          options: [
            "To gain initial access to a target system.",
            "To gather detailed information about a network's services and shares.",
            "To write a comprehensive report for the client.",
            "To identify security vulnerabilities in a web application."
          ],
          correctAnswer: 1,
          explanation: "Enumeration focuses on gathering detailed information about network services and shares."
        },
        {
          id: "q3",
          question: "What is a common tool used for cracking password hashes?",
          options: ["Nmap", "Wireshark", "John the Ripper", "Metasploit"],
          correctAnswer: 2,
          explanation: "John the Ripper is a popular password cracking tool used to crack password hashes."
        },
        {
          id: "q4",
          question: "A Man-in-the-Middle attack is best described as:",
          options: [
            "An attack that denies service to a legitimate user.",
            "An attack that takes advantage of a user's web browser.",
            "An attack where the attacker positions themselves between two communicating parties.",
            "An attack that exploits a buffer overflow vulnerability."
          ],
          correctAnswer: 2,
          explanation: "In a MITM attack, the attacker intercepts communication between two parties."
        },
        {
          id: "q5",
          question: "What is the purpose of the Metasploit Framework?",
          options: [
            "To perform social engineering attacks.",
            "To analyze network traffic.",
            "To automate vulnerability scanning.",
            "To find, exploit, and manage vulnerabilities."
          ],
          correctAnswer: 3,
          explanation: "Metasploit is a comprehensive framework for finding, exploiting, and managing vulnerabilities."
        }
      ]
    }
  },
  {
    id: 4,
    courseId: "malware-analysis",
    title: "Malware Analysis",
    description: "This course delves into the world of malicious software, covering the techniques used to analyze and understand how malware works, its behavior, and its purpose.",
    image: malwareImage,
    level: "Intermediate",
    duration: "10h",
    price: "Free",
    category: "Free",
    chapters: [
      {
        id: "chapter-1",
        title: "Foundations of Malware Analysis",
        lessons: [
          {
            id: "lesson-1-1",
            title: "What is Malware? Classifications and types (Virus, Worm, Trojan, Ransomware, etc.).",
            content: "This lesson provides a fundamental understanding of what malware is and its various classifications. Students will learn the key characteristics of viruses, worms, trojans, ransomware, spyware, and other malicious software, as well as their common methods of propagation and attack."
          },
          {
            id: "lesson-1-2",
            title: "The Malware Analysis Environment: Setting up a safe lab for analysis.",
            content: "Analyzing malware requires a safe, isolated environment to prevent it from infecting the host system. This lesson guides students through setting up a virtualized malware analysis lab using tools like VMWare or VirtualBox, ensuring that any malicious code can be run and observed without risk."
          },
          {
            id: "lesson-1-3",
            title: "Static Analysis: Tools and techniques for examining malware without running it.",
            content: "Static analysis is the process of examining a malware binary without executing it. This lesson covers tools like strings, PEStudio, and ExifTool to extract valuable information like file headers, imports, exports, and embedded strings that can reveal the malware's capabilities and purpose."
          },
          {
            id: "lesson-1-4",
            title: "Dynamic Analysis: Observing malware's behavior in a controlled environment.",
            content: "Dynamic analysis involves running malware in a controlled sandbox to observe its behavior. This lesson teaches students how to use tools like Procmon, Wireshark, and Regshot to monitor the malware's interaction with the file system, registry, and network, providing a live look at its malicious activities."
          }
        ]
      },
      {
        id: "chapter-2",
        title: "Reversing and Deobfuscation",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Assembly Language for Reverse Engineering.",
            content: "To truly understand how malware works, one must be able to read and interpret its underlying machine code. This lesson provides a crash course in assembly language, teaching the core concepts and instructions necessary for reverse engineering."
          },
          {
            id: "lesson-2-2",
            title: "Disassemblers and Debuggers: IDA Pro, Ghidra, and x64dbg.",
            content: "This lesson introduces the essential tools for in-depth analysis of malicious binaries. Students will learn how to use a disassembler like Ghidra or IDA Pro to convert machine code into human-readable assembly and a debugger like x64dbg to step through the code and observe its execution in real-time."
          },
          {
            id: "lesson-2-3",
            title: "Code Obfuscation and Packers: Techniques used by attackers to hide malicious code.",
            content: "Malware authors often use sophisticated techniques to make their code difficult to analyze. This lesson covers common obfuscation methods like junk code insertion and control flow flattening, as well as the use of packers that compress and encrypt a binary to hide its true nature."
          },
          {
            id: "lesson-2-4",
            title: "Deobfuscation Techniques: Unpacking and decrypting malicious binaries.",
            content: "This lesson provides students with the skills to defeat obfuscation and packing. It covers techniques for unpacking binaries, decrypting encrypted payloads, and automating the deobfuscation process to reveal the malware's true functionality."
          }
        ]
      },
      {
        id: "chapter-3",
        title: "Advanced Topics and Case Studies",
        lessons: [
          {
            id: "lesson-3-1",
            title: "Memory Forensics for Malware Analysis: Using tools like Volatility.",
            content: "Many modern threats are 'fileless' and reside only in memory. This lesson introduces the art of memory forensics, teaching students how to acquire a memory image from a running system and then use a tool like Volatility to analyze it for signs of malicious activity."
          },
          {
            id: "lesson-3-2",
            title: "Analyzing Rootkits and Kernel-mode Malware.",
            content: "Rootkits are a particularly insidious form of malware that operates at the kernel level, giving them deep access and making them very difficult to detect. This lesson explores the unique techniques used by rootkits and the specialized tools required to analyze them."
          },
          {
            id: "lesson-3-3",
            title: "Mobile Malware Analysis: Android and iOS.",
            content: "As mobile devices become a primary target for attackers, a new set of skills is needed. This lesson covers the specifics of analyzing Android and iOS malware, including using emulators, decompiling mobile applications, and understanding the security models of each platform."
          },
          {
            id: "lesson-3-4",
            title: "APT (Advanced Persistent Threat) Case Studies: Analyzing sophisticated, targeted attacks.",
            content: "This final lesson in the course provides an analysis of real-world, high-profile attacks by Advanced Persistent Threat (APT) groups. Students will deconstruct the techniques, tactics, and procedures used by these sophisticated actors to gain a comprehensive understanding of what a full-scale, targeted cyber operation looks like."
          },
          {
            id: "lesson-3-5",
            title: "Tools of the Trade: OllyDbg, IDA Pro, and Cuckoo Sandbox",
            content: "This lesson introduces three key tools for malware analysis. OllyDbg is a classic, powerful debugger for Windows executables, allowing you to step through code and inspect memory. IDA Pro is a multi-processor disassembler and debugger, widely regarded as the industry standard for reverse engineering. Cuckoo Sandbox is an automated malware analysis system that executes suspicious files in a safe, isolated virtual environment and records their behavior."
          }
        ]
      }
    ],
    quiz: {
      id: "malware-analysis-quiz",
      title: "Malware Analysis Quiz",
      questions: [
        {
          id: "q1",
          question: "What is the primary difference between static analysis and dynamic analysis?",
          options: [
            "Static analysis is automated, while dynamic analysis is manual.",
            "Static analysis examines malware without running it, while dynamic analysis observes its behavior during execution.",
            "Static analysis is for web applications, while dynamic analysis is for mobile apps.",
            "Static analysis is a form of reverse engineering, while dynamic analysis is not."
          ],
          correctAnswer: 1,
          explanation: "Static analysis examines malware without execution, while dynamic analysis observes behavior during execution."
        },
        {
          id: "q2",
          question: "What is the purpose of a packer in malware?",
          options: [
            "To compress the malware's size.",
            "To make the malware easier to analyze.",
            "To hide the malware's code and functionality.",
            "To help the malware spread to other computers."
          ],
          correctAnswer: 2,
          explanation: "Packers are used to hide malware's code and functionality from analysis tools."
        },
        {
          id: "q3",
          question: "Which tool would you use to acquire and analyze a memory image for a fileless malware?",
          options: ["Wireshark", "Ghidra", "Volatility", "Nmap"],
          correctAnswer: 2,
          explanation: "Volatility is a memory forensics tool used to analyze memory images for malware analysis."
        },
        {
          id: "q4",
          question: "A rootkit is a type of malware that is most difficult to detect because it:",
          options: [
            "Spreads very quickly across a network.",
            "Encrypts the user's files and demands a ransom.",
            "Operates at the kernel level of an operating system.",
            "Is designed to steal a user's personal information."
          ],
          correctAnswer: 2,
          explanation: "Rootkits operate at the kernel level, giving them deep access and making them hard to detect."
        },
        {
          id: "q5",
          question: "Which of the following would you use to get a human-readable representation of a binary's code without running it?",
          options: ["A debugger", "A disassembler", "A packet sniffer", "A memory analyzer"],
          correctAnswer: 1,
          explanation: "A disassembler converts machine code into human-readable assembly language."
        }
      ]
    }
  },
  {
    id: 5,
    courseId: "cloud-security-fundamentals",
    title: "Cloud Security Fundamentals",
    description: "This course addresses the unique security challenges and opportunities presented by cloud computing environments, covering the shared responsibility model, best practices, and security controls for major cloud platforms.",
    image: cloudImage,
    level: "Intermediate",
    duration: "9h",
    price: "$25",
    category: "Premium",
    chapters: [
      {
        id: "chapter-1",
        title: "Cloud Security Concepts",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Introduction to Cloud Computing: IaaS, PaaS, and SaaS models.",
            content: "This lesson provides a foundational understanding of cloud computing. It defines and differentiates between the three main service models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Students will understand the characteristics and security implications of each model."
          },
          {
            id: "lesson-1-2",
            title: "The Shared Responsibility Model: Understanding who is responsible for what.",
            content: "This is a crucial concept in cloud security. The shared responsibility model dictates that both the cloud provider and the customer have security obligations. This lesson explains how this model works, breaking down which security tasks are handled by the cloud provider (e.g., physical security of the data center) and which are the customer's responsibility (e.g., securing their data and applications)."
          },
          {
            id: "lesson-1-3",
            title: "Cloud Threats and Vulnerabilities: Misconfigurations, API abuse, and data breaches.",
            content: "While the cloud offers many benefits, it also introduces new security risks. This lesson explores the most common threats, including misconfigured cloud storage buckets, insecure APIs, and account hijacking. It provides a framework for thinking about security in a dynamic, elastic environment."
          },
          {
            id: "lesson-1-4",
            title: "Securing Identity and Access Management (IAM) in the cloud.",
            content: "Identity and Access Management (IAM) is the most critical control in the cloud. This lesson teaches students how to properly configure IAM policies and roles to follow the principle of least privilege, ensuring that users and services only have the permissions they absolutely need."
          }
        ]
      },
      {
        id: "chapter-2",
        title: "Securing Major Cloud Platforms (AWS, Azure, GCP)",
        lessons: [
          {
            id: "lesson-2-1",
            title: "AWS Security Services: VPC, Security Groups, IAM, and S3.",
            content: "This lesson provides a deep dive into the security services of Amazon Web Services (AWS), the largest cloud provider. It covers how to use Virtual Private Clouds (VPCs) to logically isolate resources, Security Groups and Network ACLs to filter network traffic, and how to secure Amazon S3 buckets, which are a common source of data leaks."
          },
          {
            id: "lesson-2-2",
            title: "Azure Security Services: Azure Active Directory, NSGs, and Azure Security Center.",
            content: "This lesson focuses on Microsoft Azure's security offerings. Students will learn how to secure resources using Azure Active Directory for identity management, Network Security Groups (NSGs) for traffic filtering, and Azure Security Center for continuous security posture monitoring."
          },
          {
            id: "lesson-2-3",
            title: "GCP Security Services: Cloud IAM, VPC, and Cloud Armor.",
            content: "This lesson explores Google Cloud Platform (GCP) and its security services. It covers the use of GCP's Cloud IAM for granular access control, VPC for network isolation, and Cloud Armor for protection against DDoS and web attacks."
          },
          {
            id: "lesson-2-4",
            title: "Container and Serverless Security: Docker, Kubernetes, and Lambda.",
            content: "As organizations move towards containerized and serverless architectures, new security challenges emerge. This lesson covers how to secure Docker containers, protect Kubernetes clusters, and manage the security of serverless functions like AWS Lambda and Azure Functions."
          }
        ]
      },
      {
        id: "chapter-3",
        title: "Cloud Security Operations and Compliance",
        lessons: [
          {
            id: "lesson-3-1",
            title: "Cloud Security Posture Management (CSPM) and Cloud Workload Protection Platforms (CWPP).",
            content: "This lesson introduces the tools and services used to manage security at scale in the cloud. It covers CSPM solutions that continuously monitor for misconfigurations and CWPPs that protect workloads like virtual machines and containers from threats."
          },
          {
            id: "lesson-3-2",
            title: "Cloud Monitoring and Logging: Tools and best practices.",
            content: "In the cloud, logs are the primary source of truth for security. This lesson teaches students how to set up centralized logging and monitoring, use tools like CloudWatch and Azure Monitor to alert on suspicious activity, and analyze logs to investigate security incidents."
          },
          {
            id: "lesson-3-3",
            title: "Cloud Compliance and Governance: GDPR, HIPAA, and ISO 27001.",
            content: "This lesson covers the regulatory and compliance requirements that apply to cloud environments. It provides an overview of key regulations like GDPR and HIPAA and shows how security controls can be mapped to industry standards like ISO 27001."
          },
          {
            id: "lesson-3-4",
            title: "Cloud Penetration Testing and Ethical Hacking.",
            content: "This lesson focuses on the unique aspects of conducting penetration tests in the cloud. It covers the specific rules of engagement that apply to cloud providers and explores common attack scenarios like exploiting misconfigured services, privilege escalation, and lateral movement within a cloud environment."
          },
          {
            id: "lesson-3-5",
            title: "Tools of the Trade: AWS Security Hub, Azure Security Center, and HashiCorp Vault",
            content: "This lesson highlights three crucial tools for managing cloud security. AWS Security Hub provides a centralized view of your security alerts and posture across multiple AWS accounts. Azure Security Center (now part of Microsoft Defender for Cloud) offers similar capabilities for Azure, providing unified security management and threat protection. HashiCorp Vault is a popular open-source tool for securely storing and managing secrets like API keys and passwords."
          }
        ]
      }
    ],
    quiz: {
      id: "cloud-security-quiz",
      title: "Cloud Security Fundamentals Quiz",
      questions: [
        {
          id: "q1",
          question: "According to the shared responsibility model, who is responsible for securing the physical data center in a cloud environment?",
          options: ["The customer", "The cloud provider", "The end user", "A third-party security auditor"],
          correctAnswer: 1,
          explanation: "The cloud provider is responsible for the physical security of the data center infrastructure."
        },
        {
          id: "q2",
          question: "What is a common threat vector in cloud environments that often leads to data leaks?",
          options: [
            "Cross-Site Scripting (XSS)",
            "Social Engineering",
            "Unpatched software vulnerabilities",
            "Misconfigured storage buckets"
          ],
          correctAnswer: 3,
          explanation: "Misconfigured storage buckets are a common cause of data leaks in cloud environments."
        },
        {
          id: "q3",
          question: "What principle is the foundation of a strong IAM policy in the cloud?",
          options: ["Least Privilege", "Security by Obscurity", "Access from Anywhere", "Open Access"],
          correctAnswer: 0,
          explanation: "The principle of least privilege ensures users only have the minimum permissions needed."
        },
        {
          id: "q4",
          question: "Which AWS service would you use to logically isolate your resources within the AWS cloud?",
          options: ["Amazon S3", "Virtual Private Cloud (VPC)", "CloudWatch", "IAM"],
          correctAnswer: 1,
          explanation: "VPC allows you to logically isolate your AWS resources in a virtual network."
        },
        {
          id: "q5",
          question: "What is the primary function of a Cloud Security Posture Management (CSPM) solution?",
          options: [
            "To manage virtual machines.",
            "To deploy containers.",
            "To continuously monitor for cloud misconfigurations.",
            "To encrypt data at rest."
          ],
          correctAnswer: 2,
          explanation: "CSPM solutions continuously monitor cloud environments for security misconfigurations."
        }
      ]
    }
  },
  {
    id: 6,
    courseId: "advanced-ethical-hacking",
    title: "Advanced Ethical Hacking",
    description: "Building on the foundational knowledge, this course explores sophisticated and often overlooked attack vectors, teaching students to think like a seasoned attacker.",
    image: advancedImage,
    level: "Advanced",
    duration: "20h",
    price: "$49",
    category: "Premium",
    chapters: [
      {
        id: "chapter-1",
        title: "Evasion and Stealth",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Bypassing Antivirus and EDR: Fileless attacks and living off the land.",
            content: "This lesson focuses on how attackers can bypass modern security solutions. It covers techniques like fileless malware that operates entirely in memory and the concept of 'living off the land,' where an attacker uses pre-installed tools on a system to perform malicious actions, making their activities difficult to detect."
          },
          {
            id: "lesson-1-2",
            title: "Evading Firewalls and IDS: Tunneling and obfuscation techniques.",
            content: "Firewalls and IDS are designed to block known malicious traffic, but can be bypassed. This lesson teaches how to tunnel traffic over common ports, such as HTTP or DNS, and how to use obfuscation to disguise malicious payloads from detection engines."
          },
          {
            id: "lesson-1-3",
            title: "Covering Your Tracks: Log clearing, data wiping, and steganography.",
            content: "A skilled attacker always seeks to avoid detection. This lesson covers post-exploitation techniques for erasing evidence, including clearing system logs, securely wiping data from a compromised machine, and using steganography to hide data inside seemingly innocuous files."
          },
          {
            id: "lesson-1-4",
            title: "Anonymity and Operational Security (OpSec): The use of Tor, VPNs, and proxies.",
            content: "This lesson is about protecting the attacker's identity. It covers the use of various tools and techniques to maintain anonymity, including the Tor network, anonymous VPNs, and proxy chains, emphasizing the importance of a strong operational security posture."
          }
        ]
      },
      {
        id: "chapter-2",
        title: "Exploit Development",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Introduction to Exploit Development: Buffer overflows and stack smashing.",
            content: "This lesson provides a hands-on introduction to the world of exploit development. It explains the concept of a buffer overflow and teaches students how to create a simple exploit by overwriting the stack to gain control of a program's execution flow."
          },
          {
            id: "lesson-2-2",
            title: "Shellcode Development and encoding.",
            content: "Shellcode is the payload an attacker uses after successfully exploiting a vulnerability. This lesson teaches students how to write custom shellcode to perform specific tasks, such as spawning a shell, and how to encode it to bypass security filters."
          },
          {
            id: "lesson-2-3",
            title: "Fuzzing for Vulnerabilities.",
            content: "Fuzzing is an automated technique for finding vulnerabilities by sending a large volume of malformed or random data to a program. This lesson covers the theory behind fuzzing and introduces students to popular fuzzing tools to discover previously unknown flaws in software."
          },
          {
            id: "lesson-2-4",
            title: "Exploiting Advanced Memory Corruption Vulnerabilities.",
            content: "This lesson builds on the previous concepts to cover more complex memory corruption vulnerabilities. It dives into techniques for exploiting heap-based overflows, format string bugs, and integer overflows, which are common in more sophisticated attacks."
          }
        ]
      },
      {
        id: "chapter-3",
        title: "Red Teaming and Social Engineering",
        lessons: [
          {
            id: "lesson-3-1",
            title: "Red Teaming Methodology: The simulated adversarial attack.",
            content: "Red Teaming is the ultimate form of ethical hacking, where an entire team simulates a real-world adversarial attack to test an organization's security defenses. This lesson provides a deep dive into the methodology, from initial intelligence gathering to final reporting."
          },
          {
            id: "lesson-3-2",
            title: "Physical Penetration Testing: Bypassing physical controls.",
            content: "A company's best firewalls and security software can be rendered useless by a simple lapse in physical security. This lesson covers how ethical hackers assess and bypass physical controls, including exploiting unlocked doors, tailgating, and bypassing badge readers."
          },
          {
            id: "lesson-3-3",
            title: "Advanced Social Engineering Tactics: Spear-phishing, pretexting, and physical manipulation.",
            content: "This lesson takes social engineering to the next level. It covers advanced tactics like spear-phishing (highly targeted phishing attacks), pretexting (creating a believable story to gain trust), and how to use psychological manipulation to get people to comply with requests."
          },
          {
            id: "lesson-3-4",
            title: "Writing a Professional Red Team Report.",
            content: "The most important part of any red team engagement is the report. This lesson teaches students how to create a professional, clear, and actionable report that outlines the vulnerabilities found, the path an attacker took, and detailed recommendations for remediation, providing real value to the client."
          },
          {
            id: "lesson-3-5",
            title: "Tools of the Trade: Metasploit, Kali Linux, and Empire Framework",
            content: "This lesson covers three powerful tools for advanced ethical hacking and red teaming. The Metasploit Framework is a key platform for exploitation and payload delivery. Kali Linux is the primary operating system used by penetration testers, with a vast collection of pre-installed tools. The Empire Framework is a post-exploitation tool that allows attackers to maintain persistence and move laterally within a compromised network."
          }
        ]
      }
    ],
    quiz: {
      id: "advanced-ethical-hacking-quiz",
      title: "Advanced Ethical Hacking Quiz",
      questions: [
        {
          id: "q1",
          question: "What is a fileless attack?",
          options: [
            "An attack that uses a physical USB drive.",
            "An attack that downloads a malicious file and runs it.",
            "An attack that uses pre-installed system tools and operates in memory.",
            "An attack that encrypts all the files on a system."
          ],
          correctAnswer: 2,
          explanation: "Fileless attacks use pre-installed system tools and operate entirely in memory."
        },
        {
          id: "q2",
          question: "What is the purpose of fuzzing?",
          options: [
            "To find and exploit known vulnerabilities.",
            "To test for vulnerabilities by sending malformed data to a program.",
            "To manage and control compromised systems.",
            "To perform advanced password attacks."
          ],
          correctAnswer: 1,
          explanation: "Fuzzing tests for vulnerabilities by sending malformed or random data to programs."
        },
        {
          id: "q3",
          question: "The practice of using pre-installed system tools to perform malicious actions is known as what?",
          options: ["Fileless attack", "Buffer overflow", "Living off the land", "Pivoting"],
          correctAnswer: 2,
          explanation: "'Living off the land' refers to using legitimate system tools for malicious purposes."
        },
        {
          id: "q4",
          question: "A Red Team engagement is best described as:",
          options: [
            "A bug bounty program.",
            "An ethical hacking team.",
            "A simulated adversarial attack.",
            "A vulnerability analysis tool."
          ],
          correctAnswer: 2,
          explanation: "Red Team engagements simulate real-world adversarial attacks to test defenses."
        },
        {
          id: "q5",
          question: "What is the primary goal of shellcode?",
          options: [
            "To create a new user account.",
            "To run a specific set of instructions after a successful exploit.",
            "To perform reconnaissance on a target system.",
            "To encrypt a user's files."
          ],
          correctAnswer: 1,
          explanation: "Shellcode is the payload that runs specific instructions after a successful exploit."
        }
      ]
    }
  }
];