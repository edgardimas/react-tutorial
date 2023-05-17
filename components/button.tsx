/* 
Creating and nesting components
React apps are made out of components. A component is a piece of UI that has its own logic and 
appearance. A component can be as small as button, or as large as an entire page. 
*/

export default function MyButton({ count, onClick }: any) {
  return <button onClick={onClick}> Clicked {count} times</button>;
}

/**
 * Notice that <MyButton /> starts with a capital letter. That's how you know it's a React component.
 * React component names must always start with a capital letter, while HTML tags must be lowercase.
 */

/**
 * The export default keywords specify the main component in the file. If you're not
 * familiar with some piece of JavaScript syntax, MDN and javascript.info have a great references.
 */

/**
 * The markup syntax you've seen above is called JSX. it is optional, but most React projcest use JSX
 * for its conveinence.  JSX is stricter than HRML. you have to c
 */
