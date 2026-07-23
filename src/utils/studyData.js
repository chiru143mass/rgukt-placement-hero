export const dsaRoadmap = [
  {
    id: "arrays-strings",
    title: "1. Arrays & Strings (Day 1-10)",
    difficulty: "Beginner",
    description: "The foundation of all coding interviews. Learn index manipulation, two-pointer approach, sliding window, and basic hashing.",
    concepts: [
      "Time Complexity: Access O(1), Search O(n), Insertion/Deletion O(n)",
      "Two-Pointer Technique: Useful for sorted arrays (e.g., finding pairs)",
      "Sliding Window: Useful for subarray/substring problems of length 'k'",
      "Hashing: Using objects/maps for O(1) frequency counts"
    ],
    questions: [
      {
        title: "Two Sum",
        platform: "LeetCode 1",
        description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
        logic: "Use a Hash Map to store the difference (target - current_element). If the current element exists in the map, we found the pair!",
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
      },
      {
        title: "Max Subarray (Kadane's Algorithm)",
        platform: "LeetCode 53",
        description: "Find the contiguous subarray which has the largest sum and return its sum.",
        logic: "Traverse the array, keeping track of current max sum. If current sum becomes negative, reset it to 0. Update global max sum at each step.",
        code: `function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }
  return maxSoFar;
}`
      },
      {
        title: "Valid Anagram",
        platform: "LeetCode 242",
        description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
        logic: "Compare character frequencies. Increment count for string s, decrement for string t. If all counts are zero, they are anagrams.",
        code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`
      }
    ]
  },
  {
    id: "linked-lists",
    title: "2. Linked Lists (Day 11-18)",
    difficulty: "Medium",
    description: "Learn dynamic memory allocation, pointer manipulation, floyd's cycle detection, and merging/reversing operations.",
    concepts: [
      "No contiguous memory; elements are connected by pointers.",
      "Floyd's Cycle Detection: Using slow and fast pointers to detect loops.",
      "Dummy Nodes: Using temporary nodes to simplify edge cases during insertions/deletions."
    ],
    questions: [
      {
        title: "Reverse a Linked List",
        platform: "LeetCode 206",
        description: "Reverse a singly linked list and return the new head.",
        logic: "Use three pointers: prev (null), curr (head), and next (null). Move through the list, reversing pointers at each step.",
        code: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }
  return prev;
}`
      },
      {
        title: "Merge Two Sorted Lists",
        platform: "LeetCode 21",
        description: "Merge two sorted linked lists and return it as a sorted list.",
        logic: "Use a dummy node to build the new list. Compare heads of both lists, attach the smaller node, and advance pointers.",
        code: `function mergeTwoLists(list1, list2) {
  let dummy = new ListNode(-1);
  let current = dummy;
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  current.next = list1 !== null ? list1 : list2;
  return dummy.next;
}`
      }
    ]
  },
  {
    id: "stacks-queues",
    title: "3. Stacks & Queues (Day 19-25)",
    difficulty: "Medium",
    description: "Understand linear data structures with strict entry rules (LIFO and FIFO). Crucial for parsing, backtracking, and BFS.",
    concepts: [
      "Stack: LIFO (Last In First Out). Push/Pop operations are O(1).",
      "Queue: FIFO (First In First Out). Enqueue/Dequeue operations are O(1).",
      "Monotonic Stack: Stacks that maintain elements in sorted order; useful for 'Next Greater Element' problems."
    ],
    questions: [
      {
        title: "Valid Parentheses",
        platform: "LeetCode 20",
        description: "Given a string containing brackets, determine if the input string is valid.",
        logic: "Push opening brackets to a stack. For closing brackets, pop from the stack and verify if it matches the bracket type.",
        code: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`
      },
      {
        title: "Implement Queue using Stacks",
        platform: "LeetCode 232",
        description: "Implement a first in first out (FIFO) queue using only two stacks.",
        logic: "Use stack1 for push operations. For pop/peek, if stack2 is empty, transfer all elements from stack1 to stack2, then pop from stack2.",
        code: `class MyQueue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  push(x) {
    this.stack1.push(x);
  }
  pop() {
    this.peek();
    return this.stack2.pop();
  }
  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }
  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}`
      }
    ]
  },
  {
    id: "search-sort",
    title: "4. Searching & Sorting (Day 26-32)",
    difficulty: "Medium",
    description: "Understand Binary Search, Merge Sort, Quick Sort, and search optimizations on sorted domains.",
    concepts: [
      "Binary Search: O(log n) time complexity. Requires sorted input.",
      "Merge Sort: O(n log n) stable sorting using Divide and Conquer.",
      "Quick Sort: O(n log n) average sorting. Highly efficient in-place algorithm."
    ],
    questions: [
      {
        title: "Binary Search",
        platform: "LeetCode 704",
        description: "Given a sorted array, search for a target value. Return index if found, else -1.",
        logic: "Initialize low and high pointers. Loop while low <= high. Compute middle element. Shrink bounds based on target comparison.",
        code: `function search(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
      }
    ]
  }
];

export const aptitudeData = [
  {
    id: "time-work",
    title: "Time & Work",
    formulas: [
      "Work Done = Time Taken × Efficiency",
      "If A can do a piece of work in 'n' days, then A's 1 day work = 1/n",
      "If A is twice as good a workman as B, then A's efficiency ratio is 2:1, and time taken ratio is 1:2",
      "Chain Rule: M1 × D1 × H1 / W1 = M2 × D2 × H2 / W2 (where M=men, D=days, H=hours, W=work)"
    ],
    shortcuts: "LCM Method: Find the LCM of the days taken by each person. Let this be the 'Total Work Units'. Calculate efficiency of each person per day, then divide Total Work by total daily efficiency.",
    quiz: [
      {
        question: "A can complete a work in 10 days, and B can complete the same work in 15 days. In how many days can they complete it together?",
        options: ["5 days", "6 days", "8 days", "12 days"],
        answer: 1,
        explanation: "LCM of 10 and 15 is 30 units (Total Work). \nEfficiency of A = 30 / 10 = 3 units/day. \nEfficiency of B = 30 / 15 = 2 units/day. \nTotal Efficiency together = 3 + 2 = 5 units/day. \nTime taken together = 30 / 5 = 6 days."
      },
      {
        question: "A is thrice as efficient as B. If B can complete a work in 24 days, how many days will they take together?",
        options: ["6 days", "8 days", "12 days", "16 days"],
        answer: 0,
        explanation: "Efficiency ratio of A:B = 3:1. \nSince B takes 24 days, total work = B's efficiency × days = 1 × 24 = 24 units. \nCombined efficiency = 3 + 1 = 4 units/day. \nTime taken together = 24 / 4 = 6 days."
      },
      {
        question: "12 men can complete a project in 8 days. How many days will 16 men take to complete the same project?",
        options: ["4 days", "6 days", "8 days", "10 days"],
        answer: 1,
        explanation: "Using formula M1 × D1 = M2 × D2:\n12 men × 8 days = 16 men × D2 days\n96 = 16 × D2\nD2 = 96 / 16 = 6 days."
      }
    ]
  },
  {
    id: "profit-loss",
    title: "Profit & Loss",
    formulas: [
      "Profit = Selling Price (SP) - Cost Price (CP) [SP > CP]",
      "Loss = Cost Price (CP) - Selling Price (SP) [CP > SP]",
      "Profit % = (Profit / CP) × 100",
      "Loss % = (Loss / CP) × 100",
      "Discount is always calculated on the Marked Price (MP). SP = MP - Discount"
    ],
    shortcuts: "Assume Cost Price (CP) is always 100% or Rs. 100. This makes percentage profit or loss calculations extremely quick.",
    quiz: [
      {
        question: "An article is sold for Rs. 300 at a profit of 20%. What is the Cost Price (CP) of the article?",
        options: ["Rs. 240", "Rs. 250", "Rs. 260", "Rs. 270"],
        answer: 1,
        explanation: "Profit is 20%, meaning SP is 120% of CP. \n120% of CP = Rs. 300. \nCP = (300 / 120) × 100 = 2.5 × 100 = Rs. 250."
      },
      {
        question: "A retailer buys a radio set for Rs. 225. Overheads cost Rs. 15. He sells it for Rs. 300. Find the profit percentage.",
        options: ["20%", "25%", "30%", "35%"],
        answer: 1,
        explanation: "Total Cost Price (CP) = 225 + 15 = Rs. 240.\nSelling Price (SP) = Rs. 300.\nProfit = 300 - 240 = Rs. 60.\nProfit % = (60 / 240) × 100 = 25%."
      }
    ]
  },
  {
    id: "speed-distance",
    title: "Time, Speed & Distance",
    formulas: [
      "Speed = Distance / Time",
      "To convert km/hr to m/s, multiply by 5/18",
      "To convert m/s to km/hr, multiply by 18/5",
      "Average Speed = 2xy / (x+y) [when same distance is covered at speeds x and y]"
    ],
    shortcuts: "Relative Speed: When two objects move in same direction, Relative Speed = S1 - S2. When they move in opposite directions, Relative Speed = S1 + S2.",
    quiz: [
      {
        question: "A train running at 54 km/hr crosses a telephone pole in 10 seconds. What is the length of the train?",
        options: ["100 meters", "150 meters", "180 meters", "200 meters"],
        answer: 1,
        explanation: "Convert speed to m/s: 54 × (5/18) = 15 m/s. \nDistance (length of train) = Speed × Time = 15 m/s × 10 s = 150 meters."
      },
      {
        question: "A car travels from A to B at 40 km/hr and returns from B to A at 60 km/hr. Find the average speed of the car.",
        options: ["48 km/hr", "50 km/hr", "52 km/hr", "55 km/hr"],
        answer: 0,
        explanation: "Average Speed = 2xy / (x + y) = (2 × 40 × 60) / (40 + 60) = 4800 / 100 = 48 km/hr."
      }
    ]
  }
];

export const verbalData = [
  {
    id: "subject-verb",
    title: "Subject-Verb Agreement",
    rules: [
      "Rule 1: Singular subjects take singular verbs, plural subjects take plural verbs. (e.g., 'He writes', 'They write')",
      "Rule 2: When two subjects are joined by 'and', they usually take a plural verb. (e.g., 'John and Mary are going')",
      "Rule 3: If subjects are joined by 'or', 'nor', 'either...or', 'neither...nor', the verb agrees with the subject closest to it. (e.g., 'Neither the teacher nor the students are here')",
      "Rule 4: Words like 'everyone', 'each', 'somebody', 'nobody' are singular and take singular verbs. (e.g., 'Everyone wants to succeed')"
    ],
    quiz: [
      {
        question: "Choose the correct sentence:",
        options: [
          "Either my brothers or my father are going to clear the bill.",
          "Either my brothers or my father is going to clear the bill.",
          "Either my brothers or my father were going to clear the bill.",
          "Either my brothers or my father have been going to clear the bill."
        ],
        answer: 1,
        explanation: "According to Rule 3, when subjects are connected by 'either...or', the verb agrees with the nearest subject. 'father' is singular, so it takes the singular verb 'is'."
      },
      {
        question: "Identify the error: 'Each of the participants were given a certificate of appreciation.'",
        options: [
          "Each of the",
          "participants were given",
          "a certificate of",
          "No error"
        ],
        answer: 1,
        explanation: "'Each' is a singular subject. Therefore, the verb must be singular ('was given' instead of 'were given')."
      }
    ]
  },
  {
    id: "tenses-voices",
    title: "Tenses & Active/Passive Voice",
    rules: [
      "Rule 1: Present Perfect indicates action completed in the immediate past. (e.g., 'I have finished')",
      "Rule 2: Passive voice places the action recipient at the subject position. (e.g., 'The book was written by John')",
      "Rule 3: While converting Active to Passive, the verb form becomes 'be + Past Participle'."
    ],
    quiz: [
      {
        question: "Convert to Passive: 'The chef cooked a delicious meal.'",
        options: [
          "A delicious meal is cooked by the chef.",
          "A delicious meal was cooked by the chef.",
          "A delicious meal has been cooked by the chef.",
          "A delicious meal was being cooked by the chef."
        ],
        answer: 1,
        explanation: "The active sentence is in simple past. The passive voice structure for simple past is 'was/were + past participle' -> 'was cooked by the chef'."
      }
    ]
  }
];

export const projectsBlueprints = [
  {
    id: "expense-tracker",
    title: "Project 1: AI Smart Expense Tracker (Web Dev)",
    description: "A responsive React dashboard that helps users log expenses and utilizes local AI analysis to classify spending and suggest savings.",
    techStack: "React.js, Vanilla CSS, LocalStorage, mock AI rules",
    layout: `src/
├── components/
│   ├── ExpenseForm.jsx (Adds new expenses)
│   ├── ExpenseList.jsx (Displays log table)
│   └── Analytics.jsx (Shows spending charts/categories)
├── App.jsx (Main container, state management)
└── index.css (Responsive CSS Grid dashboard)`,
    codeFiles: [
      {
        filename: "App.jsx (Core Logic)",
        code: `import React, { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem('expenses')) || [];
  });
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [aiAdvice, setAiAdvice] = useState('');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    analyzeExpenses();
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    const newExpense = { id: Date.now(), title, amount: parseFloat(amount), category };
    setExpenses([newExpense, ...expenses]);
    setTitle('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const analyzeExpenses = () => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const foodTotal = expenses.filter(e => e.category === 'Food').reduce((s, e) => s + e.amount, 0);
    
    if (total === 0) {
      setAiAdvice("Log your first expense to receive smart budgeting advice!");
    } else if (foodTotal > total * 0.5) {
      setAiAdvice("⚠️ You are spending over 50% of your budget on food. Consider home-cooked meals to save Rs. " + (foodTotal * 0.2).toFixed(0) + " monthly.");
    } else {
      setAiAdvice("✅ Your spending distribution looks healthy. Keep tracking to optimize your savings.");
    }
  };

  return (
    <div className="app-container">
      <h1>AI Smart Expense Tracker</h1>
      <div className="advice-banner">{aiAdvice}</div>
      
      <div className="grid">
        <form onSubmit={addExpense} className="card">
          <h2>Add Expense</h2>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <input type="number" placeholder="Amount (Rs)" value={amount} onChange={e => setAmount(e.target.value)} />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option>Food</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Utilities</option>
          </select>
          <button type="submit">Log Expense</button>
        </form>

        <div className="card">
          <h2>Expense Log</h2>
          <ul>
            {expenses.map(exp => (
              <li key={exp.id}>
                <span>{exp.title} - Rs.{exp.amount} ({exp.category})</span>
                <button onClick={() => deleteExpense(exp.id)} className="delete">x</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}`
      }
    ]
  },
  {
    id: "placement-predictor",
    title: "Project 2: Students Placement Grade Predictor (Python/AI)",
    description: "A machine learning mockup showing how to load academic data and predict placement probability using Python and linear models.",
    techStack: "Python, Jupyter Notebook, Pandas, Scikit-learn",
    layout: `notebooks/
├── placement_predictor.ipynb (Step-by-step Python code)
└── students_data.csv (Dataset containing CGPA, Projects Count, Backlogs, Placed)`,
    codeFiles: [
      {
        filename: "predictor.py (Core Model)",
        code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import numpy as np

# 1. Create a dummy dataset
data = {
    'cgpa': [8.5, 7.2, 9.1, 6.5, 8.0, 7.8, 6.9, 8.8, 7.5, 9.5],
    'projects_count': [3, 1, 4, 0, 2, 2, 1, 3, 2, 5],
    'backlogs': [0, 1, 0, 3, 0, 0, 2, 0, 1, 0],
    'placed': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1]
}
df = pd.DataFrame(data)

# 2. Split Features and Target
X = df[['cgpa', 'projects_count', 'backlogs']]
y = df['placed']

# 3. Train Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Initialize and Train Logistic Regression Model
model = LogisticRegression()
model.fit(X_train, y_train)

# 5. Predict Placement for a New Student
# Student details: CGPA = 8.2, Projects = 3, Backlogs = 0
new_student = np.array([[8.2, 3, 0]])
prediction = model.predict(new_student)
probability = model.predict_proba(new_student)[0][1]

print(f"Placement Prediction: {'PLACED' if prediction[0] == 1 else 'NOT PLACED'}")
print(f"Probability of Placement: {probability * 100:.2f}%")`
      }
    ]
  },
  {
    id: "file-locker",
    title: "Project 3: Cryptography File Locker (Security)",
    description: "A client-side security utility that encrypts files using AES algorithm before downloading them, ensuring user data privacy.",
    techStack: "HTML5, Vanilla JS, Web Crypto API (AES-GCM)",
    layout: `file-locker/
├── index.html (File uploader, password field, encrypt/decrypt buttons)
└── app.js (Web Crypto API encryption logic)`,
    codeFiles: [
      {
        filename: "app.js (Encryption Algorithm)",
        code: `// Secure File Encryption using AES-GCM
async function encryptFile(file, password) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  // Deriving key from password
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw", enc.encode(password), {name: "PBKDF2"}, false, ["deriveKey"]
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256"
    },
    keyMaterial,
    {name: "AES-GCM", length: 256},
    false,
    ["encrypt"]
  );

  const fileData = await file.arrayBuffer();
  const encryptedContent = await window.crypto.subtle.encrypt(
    {name: "AES-GCM", iv: iv}, key, fileData
  );

  // Combine salt, iv, and encrypted content into a single download blob
  const resultBlob = new Blob([salt, iv, new Uint8Array(encryptedContent)], {type: "application/octet-stream"});
  return resultBlob;
}`
      }
    ]
  }
];
