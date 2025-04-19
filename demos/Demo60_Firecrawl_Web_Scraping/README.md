# Demo 60: Key Features of Zod Schema Library & Firecrawl API

This section summarizes the key features of the **Zod schema library** and the **Firecrawl API** discussed in the article.

---

## Zod Schema Library

- **Type Safety**: Zod enhances TypeScript’s static typing by validating and ensuring data conforms to specific schemas.
- **Common Data Types**:
  - `z.string()`: String values.
  - `z.number()`: Number values.
  - `z.boolean()`: Boolean values.
  - `z.date()`: Date values.
  - `z.symbol()`: Symbol values.
  - `z.bigint()`: BigInt values.

- **Validator Functions**:
  - **String Validators**: 
    - `min(len)`, `max(len)`, `length(len)`
    - `email()`, `url()`, `uuid()`
    - `regex(pattern)`, `includes(str)`, `startsWith(str)`, `endsWith(str)`
  - **Number Validators**: 
    - `min(len)`, `max(len)`, `positive()`, `negative()`
    - `nonnegative()`, `nonpositive()`, `multipleOf(n)`
  - **Date Validators**: 
    - `min(date)`, `max(date)`
  - **Array Validators**:
    - `min(n)`, `max(n)`, `length(n)`
  - **Object Validators**:
    - `required()`, `merge()`, `partial()`
  - **Additional Validators**:
    - `.transform(func)`, `.default(value)`, `.optional()`, `.nullable()`, `.nullish()`

---

## Firecrawl API

- **Web Scraping**: Extracts specific data (e.g., product information, market data) from web pages by parsing HTML content.
- **Web Crawling**: Systematically browses the web to gather raw data and follow links across multiple pages.
  - **Key Features**:
    - Automated link-following.
    - Gathering raw content (HTML, CSS, JS, images).
    - Collecting data for use cases like search engines and data mining.

---
