import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  disabledEnter?: boolean;
};

export default function FormProvider({ children, onSubmit, methods, disabledEnter }: Props) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      disabledEnter &&
      event.key === 'Enter' &&
      !event.shiftKey &&
      !methods.formState.isSubmitting &&
      !methods.formState.isValidating
    ) {
      event.preventDefault();
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>
        <div
          role="presentation"
          tabIndex={-1} // Ensure the div can be focused
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
      </form>
    </Form>
  );
}
