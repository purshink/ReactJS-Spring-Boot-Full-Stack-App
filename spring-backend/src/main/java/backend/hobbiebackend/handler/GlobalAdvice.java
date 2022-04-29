package backend.hobbiebackend.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
class GlobalAdvise {
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalAdvise.class);

    @ExceptionHandler({FailToDeleteException.class, NotFoundException.class})
    public ModelAndView handleDBInconsistentException(RuntimeException ex) {
        ModelAndView modelAndView = new ModelAndView("handler");
        modelAndView.addObject("message", ex.getMessage());
        return modelAndView;
    }
}

