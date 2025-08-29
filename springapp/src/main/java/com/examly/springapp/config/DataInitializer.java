package com.examly.springapp.config;

import com.examly.springapp.model.NGO;
import com.examly.springapp.model.Cause;
import com.examly.springapp.repository.NGORepository;
import com.examly.springapp.repository.CauseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private NGORepository ngoRepository;

    @Autowired
    private CauseRepository causeRepository;

    @Override
    public void run(String... args) throws Exception {
        if (ngoRepository.count() == 0) {
            // Create sample NGOs
            NGO ngo1 = new NGO();
            ngo1.setName("Green Earth Foundation");
            ngo1.setDescription("Environmental conservation and sustainability");
            ngo1.setContactEmail("contact@greenearth.org");
            ngo1.setRegistrationNumber("NGO001");
            ngo1 = ngoRepository.save(ngo1);

            NGO ngo2 = new NGO();
            ngo2.setName("Education for All");
            ngo2.setDescription("Providing quality education to underprivileged children");
            ngo2.setContactEmail("info@educationforall.org");
            ngo2.setRegistrationNumber("NGO002");
            ngo2 = ngoRepository.save(ngo2);

            NGO ngo3 = new NGO();
            ngo3.setName("Health Care Initiative");
            ngo3.setDescription("Healthcare services for rural communities");
            ngo3.setContactEmail("support@healthcare.org");
            ngo3.setRegistrationNumber("NGO003");
            ngo3 = ngoRepository.save(ngo3);

            // Create sample causes
            Cause cause1 = new Cause();
            cause1.setTitle("Clean Water Project");
            cause1.setDescription("Providing clean drinking water to rural villages");
            cause1.setTargetAmount(new BigDecimal("50000"));
            cause1.setCurrentAmount(new BigDecimal("15000"));
            cause1.setNgo(ngo1);
            cause1.setIsActive(true);
            cause1.setStartDate(LocalDate.now().minusMonths(2));
            cause1.setEndDate(LocalDate.now().plusMonths(4));
            causeRepository.save(cause1);

            Cause cause2 = new Cause();
            cause2.setTitle("School Building Fund");
            cause2.setDescription("Building new classrooms for primary education");
            cause2.setTargetAmount(new BigDecimal("75000"));
            cause2.setCurrentAmount(new BigDecimal("25000"));
            cause2.setNgo(ngo2);
            cause2.setIsActive(true);
            cause2.setStartDate(LocalDate.now().minusMonths(1));
            cause2.setEndDate(LocalDate.now().plusMonths(6));
            causeRepository.save(cause2);

            Cause cause3 = new Cause();
            cause3.setTitle("Medical Equipment Drive");
            cause3.setDescription("Essential medical equipment for rural clinics");
            cause3.setTargetAmount(new BigDecimal("30000"));
            cause3.setCurrentAmount(new BigDecimal("8000"));
            cause3.setNgo(ngo3);
            cause3.setIsActive(true);
            cause3.setStartDate(LocalDate.now().minusWeeks(3));
            cause3.setEndDate(LocalDate.now().plusMonths(3));
            causeRepository.save(cause3);
        }
    }
}