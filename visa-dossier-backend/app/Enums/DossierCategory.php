<?php

namespace App\Enums;

enum DossierCategory: string
{
    case VISA_FORM = 'visa_form';
    case PHOTO = 'photo';
    case PASSPORT = 'passport';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
