<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'description',
        'preview_url',
        'thumbnail_url',
        'is_premium',
        'category',
        'price',
        'original_price',
        'discount',
        'features',
        'colors',
        'fonts',
        'layout',
        'tags',
        'is_popular',
        'is_new',
        'downloads'
    ];

    /**
     * Use slug instead of id for route binding (optional).
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function profiles()
    {
        return $this->hasMany(Profile::class);
    }

    public function paymentProofs()
    {
        return $this->hasMany(PaymentProof::class);
    }

    public function templateUnlocks()
    {
        return $this->hasMany(TemplateUnlock::class);
    }
}
