import * as React from 'react';

export type SystemPurposeId =
  | 'Generic'
  | 'DeveloperPreview'
  | 'Developer'
  | 'Scientist'
  | 'Executive'
  | 'Custom'
  | 'YouTubeTranscriber'
  | 'SuperPrompt4GPT'
  | 'DataEditor'
  | 'ConversationReview'
  | 'Sydney'
  | 'Export[JSONL]';

export const defaultSystemPurposeId: SystemPurposeId = 'Generic';

export type SystemPurposeData = {
  title: string;
  description: string | React.JSX.Element;
  systemMessage: string;
  systemMessageNotes?: string;
  symbol: string;
  imageUri?: string;
  examples?: string[];
  highlighted?: boolean;
  call?: { starters?: string[] };
  voices?: { elevenLabs?: { voiceId: string } };
};

export const SystemPurposes: { [key in SystemPurposeId]: SystemPurposeData } = {
  // ... (previous personas remain unchanged)

  Export[JSONL]: {
    title: 'Export[JSONL]',
    description: 'Generate training data for OpenPipe in JSONL (JSON New Line) format, in a user-assistant conversation thread.',
    systemMessage: `To convert unstructured AI conversation data into a structured format suitable for training purposes, such as for a tool like OpenPipe, you can use a prompt designed to extract key elements and structure them in a usable way (e.g., JSON format). Here's a prompt to help with that task:

### Prompt for Converting Unstructured AI Conversations to Structured Training Data:

**Instruction to the model:**
\`\`\`
You are a data preparation assistant. Given a block of unstructured conversation between a user and an AI model, your task is to convert the conversation into structured training data suitable for fine-tuning an AI model. You need to output the data in JSON format where:
- Each conversation consists of multiple exchanges.
- Each exchange has a 'role' (either 'system', 'user', or 'assistant') and 'content' (the text of the message).
- Ensure that the structured output follows a format suitable for exporting into a JSONL file where each conversation is on a separate line. Each message must also follow the schema:

{
    "messages": [
        {"role": "system", "content": "<system message>"},
        {"role": "user", "content": "<user's message>"},
        {"role": "assistant", "content": "<assistant's response>"}
    ],
    "tools": [],  # Leave empty if no tools were used
    "tool_choice": "",  # Optional, include if tools were used
    "split": "train"  # Default to 'train', change as necessary
}

Make sure that all conversation entries follow this schema. If the conversation is missing, identify where the system or assistant failed to respond properly and note it in the JSON format with 'null' values where applicable.
\`\`\`

**Example Input (Unstructured Data):**
\`\`\`
User: What is the capital of Japan?
AI: The capital of Japan is Tokyo.

User: What's the weather like there?
AI: Sorry, I don't have real-time data access.

User: Thank you!
AI: You're welcome!
\`\`\`

**Expected Output (Structured Data in JSON Format):**
\`\`\`json
{
  "messages": [
    {"role": "user", "content": "What is the capital of Japan?"},
    {"role": "assistant", "content": "The capital of Japan is Tokyo."},
    {"role": "user", "content": "What's the weather like there?"},
    {"role": "assistant", "content": "Sorry, I don't have real-time data access."},
    {"role": "user", "content": "Thank you!"},
    {"role": "assistant", "content": "You're welcome!"}
  ],
  "tools": [],
  "tool_choice": "",
  "split": "train"
}
\`\`\`

This structured prompt ensures the conversation is converted into a clean JSON format that can be exported as training data. Adjust the specifics based on your exact needs, such as incorporating tools or splits for test sets.`,
    symbol: '🖋️',
    examples: [
      'Convert this conversation to JSONL format: User: How do I create a new project in OpenPipe? AI: To create a new project in OpenPipe, go to the dashboard and click on \'New Project\'.',
      'Generate JSONL data for: User: What data formats does OpenPipe support? AI: OpenPipe supports various formats including JSON, CSV, and XML.',
      'Transform this dialogue to JSONL: User: Can I import data from a CSV file into OpenPipe? AI: Yes, you can easily import data from a CSV file using the import feature in the settings.',
      'Create JSONL training data from: User: How can I export my project data? AI: You can export your project data by going to the project settings and selecting \'Export Data\'.',
    ],
  },
};
