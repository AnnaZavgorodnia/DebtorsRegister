package ua.gov.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ua.gov.security.MyUserDetailsService;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final MyUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http        .authorizeRequests()
                .antMatchers("/all-profiles","/create-registers-profile",
                        "/search-registers-profile", "/update-profile").hasAuthority("ADMIN")
                .antMatchers("/create-debt","/detailed-record-info",
                        "/update-debt").hasAuthority("REGISTER")
                .antMatchers("/profile").hasAnyAuthority("ADMIN","REGISTER")
                .antMatchers("/**","/js/**", "/css/**","/img/**","/api/**","/alimony-debtors","/search-debtor",
                        "/wages-debtors","/child-dates-debtors").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/login").permitAll()
                .defaultSuccessUrl("/")
                .and()
                .logout().permitAll()
                .logoutSuccessUrl("/")
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .and()
                .csrf().disable()
        ;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }
}
