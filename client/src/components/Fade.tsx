// // import { loadData } from 'react-router-dom';

// import { CSSTransition } from 'react-transition-group';

// interface FadeProps {
//   children: React.ReactElement;
//   className: string;
//   nodeRef: React.RefObject<HTMLElement>;
//   show: boolean;
// }

// export default function Fade({
//   children,
//   className,
//   nodeRef,
//   show,
// }: FadeProps) {
//   return (
//     <CSSTransition
//       in={show}
//       nodeRef={nodeRef}
//       timeout={250}
//       classNames="fade"
//       unmountOnExit
//       onEnter={() => console.log('onEnter')}
//       onExited={() => console.log('onExit')}
//     >
//       <section
//         ref={nodeRef}
//         className={className}
//       >
//         {children}
//       </section>
//     </CSSTransition>
//   );
// }
