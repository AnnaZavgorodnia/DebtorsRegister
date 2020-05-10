package ua.gov.model;

import org.springframework.security.core.GrantedAuthority;

public enum RoleType implements GrantedAuthority {
    ADMIN,
    CLIENT,
    MASTER;

    @Override
    public String getAuthority() {
        return name();
    }
}
