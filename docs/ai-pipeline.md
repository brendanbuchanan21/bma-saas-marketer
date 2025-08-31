How Claude should handle AI-generated content.

Models: OpenAI GPT (fallback: Anthropic/Claude).

Input: always provide client profile, keywords, service, desired tone.

Output: JSON { title, body, metaTitle, metaDescription, keywords }.

SEO rules:

Title < 60 chars, meta < 160 chars.

Include at least 1 keyword in first paragraph.

Never publish raw AI output — pass through “cleaning/sanitization” step.